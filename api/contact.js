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
    const { name, email, phone, type, budget, message, utm_source, utm_medium, utm_campaign } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ error: 'Vui lòng cung cấp họ tên và số điện thoại liên hệ.' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Server Configuration: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return res.status(500).json({ error: 'Chưa cấu hình biến môi trường Telegram bot trên server.' });
    }

    const escapeHtml = (text) => {
      if (!text) return '<i>(Không điền)</i>';
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };

    // Telegram HTML formatted text
    const now = new Date();
    const timeStr = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    const campaignInfo = utm_source || utm_campaign
      ? `${escapeHtml(utm_source || 'Direct')} (Campaign: ${escapeHtml(utm_campaign || 'N/A')}, Medium: ${escapeHtml(utm_medium || 'N/A')})`
      : 'Truy cập trực tiếp (Direct Web)';

    const telegramMessage = `🚨 <b>CÓ YÊU CẦU TƯ VẤN MỚI TỪ TP TEAMS!</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Khách hàng:</b> ${escapeHtml(name)}
📞 <b>Số điện thoại / Zalo:</b> <code>${escapeHtml(phone)}</code>
✉️ <b>Email:</b> ${escapeHtml(email)}
🛠️ <b>Gói dịch vụ:</b> ${escapeHtml(type || 'Tư vấn giải pháp')}
💰 <b>Ngân sách:</b> ${escapeHtml(budget || 'Chưa chọn')}
📝 <b>Bài toán / Yêu cầu:</b>
<blockquote>${escapeHtml(message || 'Cần tư vấn giải pháp')}</blockquote>
━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 <b>Nguồn chiến dịch:</b> ${campaignInfo}
⏰ <b>Thời gian:</b> ${timeStr}
🌐 <b>Hệ thống:</b> TP Teams Agency (landing.votrithuc.click)`;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(502).json({ error: 'Lỗi gửi tin nhắn sang Telegram: ' + (data.description || 'Unknown') });
    }

    return res.status(200).json({ success: true, message: 'Đã tiếp nhận yêu cầu thành công!' });
  } catch (error) {
    console.error('API Contact Error:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.' });
  }
}
