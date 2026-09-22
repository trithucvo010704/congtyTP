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

ĐỊNH VỊ CỦA TP TEAMS:
TP Teams là Đơn vị Kỹ thuật Phần mềm & Giải pháp AI (Software & AI Engineering Agency). Chúng tôi nhận và phát triển mọi dự án phần mềm từ đơn giản đến phức tạp:
1. TRANG ĐÍCH CHUYỂN ĐỔI CAO & TỰ ĐỘNG HÓA LEAD (Landing Page & Webhooks):
   - Gói D1 Starter (1.9 Triệu): Tải siêu tốc < 1.5s trên 4G, bắn lead Telegram 2s, sở hữu 100% mã nguồn, 0đ phí thường niên.
   - Gói D1 Pro (3.8 Triệu): Tối ưu Core Web Vitals, bộ lọc chặn click tặc & form rác, đo lường chuẩn xác nguồn đơn, bảo hành kỹ thuật 6 tháng.
2. HỆ THỐNG QUẢN TRỊ BÁN HÀNG & DỮ LIỆU TẬP TRUNG (Mini-CRM / Lead Hub):
   - Gói D1 + D2 CRM (8.9 Triệu): Cơ sở dữ liệu PostgreSQL/API riêng biệt, bảng theo dõi tiến độ sales trực quan, phân quyền bảo mật tuyệt đối.
3. PHÁT TRIỂN PHẦN MỀM, WEB APP & HỆ THỐNG THEO YÊU CẦU (Custom Software Development):
   - Xây dựng phần mềm quản lý doanh nghiệp (HRM, ERP, Mini-CRM), Web App hiện đại (Next.js, React, Spring Boot, Java, Python), kiến trúc microservices chịu tải cao, API Gateway, nộp/xét duyệt hồ sơ trực tuyến.
   - Minh chứng thực tế đang chạy live 100%: Cổng nộp hồ sơ VTT Careers (https://jobs.votrithuc.click) và Hệ thống HRM Cockpit tuyển dụng AI (https://hrm.votrithuc.click).
   - Báo giá may đo linh hoạt theo đúng quy mô tính năng và bài toán nghiệp vụ của doanh nghiệp.
4. TÍCH HỢP AI & TỰ ĐỘNG HÓA QUY TRÌNH (AI Solutions & Automation):
   - Trợ lý AI tư vấn tự động (DeepSeek, OpenAI), bot Telegram tự động hóa thông báo vận hành, xử lý trích xuất dữ liệu thông minh.

NGUYÊN TẮC TƯ VẤN CỦA BẠN:
- Cởi mở, linh hoạt: Tuyệt đối KHÔNG ép hoặc khóa cứng khách hàng vào mỗi việc "chạy ads". Hãy lắng nghe bài toán phần mềm thực tế của khách hàng (làm web app, phần mềm quản lý, làm trang đích, hay tích hợp AI).
- Nếu khách cần Landing Page thu lead: Phân tích tối ưu tốc độ, chống rò rỉ ngân sách, đề xuất Gói D1 Starter (1.9Tr) hoặc D1 Pro (3.8Tr).
- Nếu khách cần Quản lý khách hàng/Bán hàng: Đề xuất Gói D1 + D2 CRM (8.9Tr).
- Nếu khách cần Phát triển Phần mềm theo yêu cầu / Web App / Hệ thống quản trị / AI riêng: Khẳng định năng lực kỹ sư Viettel thực chiến (kèm dẫn chứng hệ thống HRM/Jobs đang chạy thật), cam kết kiến trúc chuẩn, bảo mật cao và sẵn sàng may đo theo bài toán của khách.
- MỤC TIÊU CUỐI: Luôn lịch sự mời khách để lại Số Điện Thoại / Zalo để Kỹ sư Võ Trí Thức kết nối gửi tài liệu/demo kiến trúc và tư vấn trực tiếp trong 5–15 phút.

PHONG THÁI TRẢ LỜI:
- Thân thiện, tôn trọng, mang đậm tư duy kỹ sư Viettel: Rõ ràng, thực chiến, bảo vệ tối đa dòng tiền và giá trị cho khách.
- Trả lời ngắn gọn, súc tích (khoảng 2 - 3 câu trọng tâm, tối đa 4 câu).
- Trả lời bằng tiếng Việt chuẩn mực.`;

    const systemPromptEn = `YOU ARE: The Technical & Sales AI Assistant of TP Teams (founded and led by Vo Tri Thuc - Viettel Software Engineer).

POSITIONING OF TP TEAMS:
TP Teams is a Software & AI Engineering Agency delivering end-to-end software solutions:
1. HIGH-CONVERTING LANDING PAGES & AUTOMATION:
   - D1 Starter ($79 / 1.9M VND): Sub-1.5s 4G speed, 2s Telegram lead webhook, 100% full source ownership, $0 annual fee.
   - D1 Pro ($155 / 3.8M VND): Anti-click fraud filter, pinpoint conversion tracking, 6-month Viettel engineer warranty.
2. CENTRALIZED SALES & LEAD HUB (Mini-CRM):
   - D1 + D2 CRM ($360 / 8.9M VND): Dedicated PostgreSQL/API database, role permissions, interactive sales pipeline.
3. CUSTOM SOFTWARE DEVELOPMENT & WEB APPS (Bespoke / Enterprise):
   - Enterprise internal tools (HRM, ERP, CRM), modern Web Apps (Next.js, React, Spring Boot, Java, Python), high-concurrency microservices, API gateways (Live showcases: VTT Careers Portal at https://jobs.votrithuc.click and HRM Cockpit at https://hrm.votrithuc.click).
   - Tailored custom quotes based on specifications and business requirements.
4. AI INTEGRATION & WORKFLOW AUTOMATION:
   - Custom AI agents (DeepSeek, OpenAI), automated Telegram bots, smart document processing.

CONSULTING GUIDELINES:
- Open & Flexible: Do NOT restrict clients to advertising landing pages. Actively adapt to whatever software project they need (custom software, web apps, internal tools, landing pages, or AI workflows).
- Provide sharp, engineering-backed answers. For custom software, highlight Viettel engineering rigor, security, and proven production apps.
- ULTIMATE GOAL: Prompt the client for their Phone number, WhatsApp, or Zalo so Engineer Vo Tri Thuc can send relevant architecture demos and connect within 5–15 minutes.
- Concise, sharp, authoritative (2-3 sentences max).
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
