// api/notify.js вЂ” РїСЂРёРЅРёРјР°РµС‚ POST РѕС‚ РјРёРЅРё-РїСЂРёР»РѕР¶РµРЅРёСЏ Рё С€Р»С‘С‚ РјРµРЅРµРґР¶РµСЂСѓ С‡РµСЂРµР· Р±РѕС‚Р°

const BOT_TOKEN = process.env.BOT_TOKEN;
const MANAGER_CHAT_ID = process.env.MANAGER_CHAT_ID;

export default async function handler(req, res){
  // CORS РґР»СЏ Р·Р°РїСЂРѕСЃРѕРІ РёР· РјРёРЅРё-РїСЂРёР»РѕР¶РµРЅРёСЏ
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  if(!BOT_TOKEN || !MANAGER_CHAT_ID){
    return res.status(500).json({ error: 'Server not configured' });
  }
  
  const { text } = req.body || {};
  if(!text || typeof text !== 'string'){
    return res.status(400).json({ error: 'Missing text' });
  }
  
  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: MANAGER_CHAT_ID, text })
    });
    const data = await tgRes.json();
    if(!data.ok){
      console.error('Telegram error:', data);
      return res.status(500).json({ error: 'Telegram error', details: data.description });
    }
    return res.status(200).json({ ok: true });
  } catch(e){
    console.error(e);
    return res.status(500).json({ error: 'Fetch failed' });
  }
}
