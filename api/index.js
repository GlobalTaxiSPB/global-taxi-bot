import { MESSAGES } from "./messages.js";

export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    return res.status(500).send("BOT_TOKEN not found");
  }

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const update = req.body;

  if (!update.message) {
    return res.status(200).send("OK");
  }

  const chatId = update.message.chat.id;
  const text = update.message.text || "";

  let message = "";
  let keyboard = {};

  if (text === "/start") {

    message = MESSAGES.welcome;

    keyboard = {
      keyboard: [
        ["🚖 Заказать поездку"],
        ["💰 Рассчитать стоимость"],
        ["🌍 Межгород"],
        ["🚘 Стать водителем"],
        ["☎️ Связаться с оператором"]
      ],
      resize_keyboard: true,
      persistent: true
    };

  } else if (text === "🚖 Заказать поездку") {

    message = MESSAGES.order;

  } else if (text === "💰 Рассчитать стоимость") {

    message = MESSAGES.price;

  } else if (text === "🌍 Межгород") {

    message = MESSAGES.intercity;

  } else if (text === "🚘 Стать водителем") {

    message = MESSAGES.driver;

  } else if (text === "☎️ Связаться с оператором") {

    message = MESSAGES.operator;

  } else {
  message = `✅ Спасибо!

Ваше сообщение получено:

${text}

Оператор скоро свяжется с вами.`;
}
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      reply_markup: keyboard
    })
  });

  return res.status(200).send("OK");
}
