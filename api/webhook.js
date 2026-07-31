// api/webhook.js вЂ” Telegram bot handler on Vercel serverless

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

const WELCOME_TEXT = "\u{1F44B} \u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u043e *\u0421\u0444\u0435\u0440\u0430*\n\n\u041c\u0435\u0441\u0442\u043e, \u0433\u0434\u0435 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438 \u0441\u0442\u0430\u043d\u043e\u0432\u044f\u0442\u0441\u044f \u0447\u0430\u0441\u0442\u044c\u044e \u0432\u0430\u0448\u0435\u0439 \u0436\u0438\u0437\u043d\u0438.\n\n\u0415\u0441\u043b\u0438 \u0432\u044b \u0436\u0435\u043b\u0430\u0435\u0442\u0435 \u043e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437 \u2014 \u043f\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u0441\u043d\u0438\u0437\u0443 \u{1F447}\n\u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u0434\u0440\u0443\u0433\u043e\u0439 \u0432\u043e\u043f\u0440\u043e\u0441 \u2014 \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u0435, \u043f\u0440\u043e\u043f\u0438\u0441\u0430\u0432 \"/\" \u0432 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0438.\n\n\u0418 \u043f\u043e\u043c\u043d\u0438\u0442\u0435, \u0434\u0440\u0443\u0437\u044c\u044f, \u0433\u043b\u0430\u0432\u043d\u043e\u0435 \u2014 \u0432\u043d\u0443\u0442\u0440\u0438.";

const HELP_TEXT = "\u041f\u043e \u043b\u044e\u0431\u044b\u043c \u0432\u043e\u043f\u0440\u043e\u0441\u0430\u043c \u043d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u0448\u0435\u043c\u0443 \u0441\u0430\u043f\u043f\u043e\u0440\u0442\u0443: @SferaAssistant\n\n\u041e\u0442\u0432\u0435\u0447\u0430\u0435\u043c \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0440\u0430\u0431\u043e\u0447\u0435\u0433\u043e \u0434\u043d\u044f.";

const ORDER_TEXT = "\u0427\u0442\u043e\u0431\u044b \u0443\u0437\u043d\u0430\u0442\u044c \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043a\u0430\u0437\u0430, \u043d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0437\u0430\u043a\u0430\u0437\u0430 \u0441\u0430\u043f\u043f\u043e\u0440\u0442\u0443:\n@SferaAssistant\n\n\u041e\u043d \u043e\u0442\u0432\u0435\u0442\u0438\u0442 \u0441 \u0430\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0435\u0439.";

const CONTACT_TEXT = "\u{1F4DE} *\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438:* +7 (995) 918-38-22\n\u2709\uFE0F *Email:* shopsferaa@yandex.ru\n\u{1F464} *\u0421\u0430\u043f\u043f\u043e\u0440\u0442 \u0432 Telegram:* @SferaAssistant";

const BUTTON_TEXT = "\u{1F6CD} \u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0430\u0433\u0430\u0437\u0438\u043d";

async function tg(method, body){
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

function shopKeyboard(){
  return { inline_keyboard: [[ { text: BUTTON_TEXT, web_app: { url: WEB_APP_URL } } ]] };
}

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(200).json({ ok: true });
  
  const update = req.body;
  const msg = update.message;
  if(!msg || !msg.text) return res.status(200).json({ ok: true });
  
  const chatId = msg.chat.id;
  const text = msg.text.trim();
  const cmd = text.split(/\s+/)[0].toLowerCase();
  
  if(cmd === '/start'){
    await tg('sendMessage', {
      chat_id: chatId,
      text: WELCOME_TEXT,
      parse_mode: 'Markdown',
      reply_markup: shopKeyboard()
    });
  } else if(cmd === '/help'){
    await tg('sendMessage', { chat_id: chatId, text: HELP_TEXT });
  } else if(cmd === '/order'){
    await tg('sendMessage', { chat_id: chatId, text: ORDER_TEXT });
  } else if(cmd === '/contact'){
    await tg('sendMessage', { chat_id: chatId, text: CONTACT_TEXT, parse_mode: 'Markdown' });
  }
  
  return res.status(200).json({ ok: true });
}
