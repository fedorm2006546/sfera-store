// api/webhook.js вЂ” РѕР±СЂР°Р±РѕС‚С‡РёРє Telegram-Р±РѕС‚Р° РЅР° Vercel serverless
// Р РµР°РіРёСЂСѓРµС‚ РЅР° /start Рё РґСЂСѓРіРёРµ РєРѕРјР°РЅРґС‹

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL; // РЅР°РїСЂ. https://fd-gold.vercel.app

const WELCOME_TEXT = "\Добро пожаловать в технологическое пространство Сфера!\nМесто, где техологии становятся частью вашей жизин.\n Если вы хотите оформить заказ — перейдите в магазин по кнопке ниже"\nИ помните, друзья, главное — внутри.;

const BUTTON_TEXT = "\Открыть магазин";
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
