// api/webhook.js вЂ” РѕР±СЂР°Р±РѕС‚С‡РёРє Telegram-Р±РѕС‚Р° РЅР° Vercel serverless
// Р РµР°РіРёСЂСѓРµС‚ РЅР° /start Рё РґСЂСѓРіРёРµ РєРѕРјР°РЅРґС‹

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL; // РЅР°РїСЂ. https://fd-gold.vercel.app

// в”Ђв”Ђ РўР•РљРЎРў РџР РР’Р•РўРЎРўР’РРЇ (СЂРµРґР°РєС‚РёСЂСѓР№ Р·РґРµСЃСЊ) в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
const WELCOME_TEXT = `рџ‘‹ Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ РІ *РЎС„РµСЂР° Store*!

Р—РґРµСЃСЊ С‚С‹ РЅР°Р№РґС‘С€СЊ РѕСЂРёРіРёРЅР°Р»СЊРЅСѓСЋ С‚РµС…РЅРёРєСѓ Apple, Samsung, Dyson Рё РЅРµ С‚РѕР»СЊРєРѕ вЂ” РїРѕ Р»СѓС‡С€РёРј С†РµРЅР°Рј.

РќР°Р¶РјРё РєРЅРѕРїРєСѓ РЅРёР¶Рµ, С‡С‚РѕР±С‹ РѕС‚РєСЂС‹С‚СЊ РјР°РіР°Р·РёРЅ рџ‘‡`;

const BUTTON_TEXT = "рџ›Ќ РћС‚РєСЂС‹С‚СЊ РјР°РіР°Р·РёРЅ";
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ

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
