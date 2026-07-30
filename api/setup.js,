// api/setup.js вЂ” РѕС‚РєСЂРѕР№ СЌС‚РѕС‚ URL РѕРґРёРЅ СЂР°Р· РІ Р±СЂР°СѓР·РµСЂРµ,
// С‡С‚РѕР±С‹ Telegram СѓР·РЅР°Р» РєСѓРґР° СЃР»Р°С‚СЊ Р°РїРґРµР№С‚С‹ Р±РѕС‚Р°.
// РџРѕСЃР»Рµ РїРµСЂРІРѕРіРѕ Р·Р°РїСѓСЃРєР° РјРѕР¶РЅРѕ СѓРґР°Р»РёС‚СЊ СЌС‚РѕС‚ С„Р°Р№Р».

const BOT_TOKEN = process.env.BOT_TOKEN;

export default async function handler(req, res){
  const host = req.headers.host;
  const webhookUrl = `https://${host}/api/webhook`;
  
  const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrl })
  });
  const data = await r.json();
  
  res.status(200).json({
    webhook_registered_to: webhookUrl,
    telegram_response: data
  });
}
