export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, lang = 'vi' } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-034e9865527b487880d2e47a38937645';

    const systemPromptVi = `BẠN LÀ: Trợ lý Kỹ thuật & Bán hàng AI của TP Teams (dẫn dắt bởi Founder Võ Trí Thức - Kỹ sư Viettel).

MỤC TIÊU CỐT LÕI:
1. Lắng nghe ngành nghề và ngân sách chạy ads của khách hàng.
2. Phân tích điểm nghẽn rò rỉ dòng tiền (trang tải chậm >3s mất 50% khách, không bắt đúng nguồn ads nào ra đơn, bị ép trả phí duy trì hàng năm 3.5 - 6 triệu/năm).
3. Đề xuất chuẩn xác 1 trong 3 gói dịch vụ:
   - Ngân sách < 10tr/tháng hoặc shop mới: Gói D1 Starter (1.9 Triệu) — Tải siêu tốc < 1.5s, nhận lead tức thì 2s qua Telegram, sở hữu mã nguồn vĩnh viễn, 0đ phí thường niên.
   - Ngân sách 10 - 50tr/tháng: Gói D1 Pro (3.8 Triệu) — Bộ lọc chặn click tặc & form rác, đo lường chuẩn xác bài ads ra tiền, bảo hành kỹ thuật 6 tháng.
   - Doanh nghiệp có đội Sales / Ngân sách lớn: Gói D1 + D2 CRM (8.9 Triệu) — Kho dữ liệu khách hàng riêng biệt, bảng theo dõi tiến độ sales, phân quyền bảo mật tuyệt đối.
4. Mời khách để lại Số Điện Thoại / Zalo để Kỹ sư Võ Trí Thức gửi demo thực chiến đúng sản phẩm của họ và kết nối tư vấn trong 5–15 phút.

NGUYÊN TẮC TRẢ LỜI:
- Thân thiện, khiêm tốn nhưng đanh thép về chuyên môn kỹ thuật.
- Trả lời ngắn gọn, súc tích (khoảng 2 - 3 câu súc tích), không nói dài dòng triết lý.
- Luôn giữ vững tinh thần "Kỹ sư Viettel: Kỷ luật, trách nhiệm, bảo vệ dòng tiền cho khách".
- Trả lời bằng tiếng Việt chuẩn mực.`;

    const systemPromptEn = `YOU ARE: The Technical & Sales AI Assistant of TP Teams (led by Founder Vo Tri Thuc - Viettel Software Engineer).

CORE OBJECTIVES:
1. Understand the client's business niche and monthly advertising budget.
2. Highlight ad budget leakage (pages loading >3s bouncing 50% clicks, missing ad attribution, recurring annual SaaS fees of $150-$250/year).
3. Recommend the optimal package:
   - Budget < $500/mo or testing: D1 Starter ($79 / 1.9M VND) — Sub-1.5s mobile speed, 2s Telegram lead webhook, 100% full source ownership, $0 annual fee.
   - Budget $500 - $2,500/mo: D1 Pro ($155 / 3.8M VND) — Anti-click fraud filter, bulletproof ad conversion tracking, 6-month Viettel engineer warranty.
   - Enterprise / Sales teams: D1 + D2 CRM ($360 / 8.9M VND) — Isolated customer database, sales pipeline tracker, strict role permissions.
4. Prompt the client for their Phone / WhatsApp / Zalo so Engineer Vo Tri Thuc can send a bespoke demo and review within 5–15 minutes.

GUIDELINES:
- Concise, sharp, authoritative yet courteous (max 2-3 sentences per message).
- Reflect the core engineering value: Discipline, reliability, and cash flow protection.
- Reply in natural, professional English.`;

    const systemPrompt = lang === 'en' ? systemPromptEn : systemPromptVi;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-6).map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: String(m.content || '').slice(0, 1000)
      }))
    ];

    const deepseekRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: formattedMessages,
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!deepseekRes.ok) {
      const errText = await deepseekRes.text();
      console.error('DeepSeek API error:', errText);
      return res.status(502).json({
        error: 'AI service temporarily unavailable',
        fallback: lang === 'en'
          ? "I am connected to Engineer Vo Tri Thuc's system. Please leave your phone number or WhatsApp/Zalo so he can directly advise you within 5–15 minutes!"
          : "Mình đã ghi nhận bài toán của bạn! Hãy để lại Số điện thoại hoặc Zalo để Kỹ sư Võ Trí Thức gửi demo và tư vấn trực tiếp cho bạn ngay trong 5–15 phút nhé!"
      });
    }

    const data = await deepseekRes.json();
    const reply = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({
      reply,
      usage: data.usage
    });
  } catch (err) {
    console.error('Assistant handler error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      fallback: 'Vui lòng để lại Số điện thoại / Zalo để Kỹ sư Võ Trí Thức kết nối hỗ trợ bạn ngay trong 5–15 phút!'
    });
  }
}
