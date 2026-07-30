// api/webhook.js вЂ” РѕР±СЂР°Р±РѕС‚С‡РёРє Telegram-Р±РѕС‚Р° РЅР° Vercel serverless
// Р РµР°РіРёСЂСѓРµС‚ РЅР° /start Рё РґСЂСѓРіРёРµ РєРѕРјР°РЅРґС‹

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL; // РЅР°РїСЂ. https://fd-gold.vercel.app

const WELCOME_TEXT = "\u{1F44B} \u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 *\u0421\u0444\u0435\u0440\u0430 Store*!\n\n\u0417\u0434\u0435\u0441\u044c \u0442\u044b \u043d\u0430\u0439\u0434\u0451\u0448\u044c \u043e\u0440\u0438\u0433\u0438\u043d\u0430\u043b\u044c\u043d\u0443\u044e \u0442\u0435\u0445\u043d\u0438\u043a\u0443 Apple, Samsung, Dyson \u0438 \u043d\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u2014 \u043f\u043e \u043b\u0443\u0447\u0448\u0438\u043c \u0446\u0435\u043d\u0430\u043c.\n\n\u041d\u0430\u0436\u043c\u0438 \u043a\u043d\u043e\u043f\u043a\u0443 \u043d\u0438\u0436\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0430\u0433\u0430\u0437\u0438\u043d \u{1F447}";

const BUTTON_TEXT = "\пенис";
async function tg(method, body){
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(200).json({ ok: true });
  
  const update = req.body;
  const msg = update.message;
  if(!msg || !msg.text) return res.status(200).json({ ok: true });
  
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  
  if(text === '/start' || text.startsWith('/start ')){
    await tg('sendMessage', {
      chat_id: chatId,
      text: WELCOME_TEXT,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: BUTTON_TEXT, web_app: { url: WEB_APP_URL } }
        ]]
      }
    });
  }
  
  return res.status(200).json({ ok: true });
}
