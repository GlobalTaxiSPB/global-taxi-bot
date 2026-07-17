export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "BOT_TOKEN not found" });
  }

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  try {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || "";

      if (text === "/start") {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text:
`🚖 Добро пожаловать в Global Taxi SPB!

Междугородние поездки по России.

Выберите действие:`,
            reply_markup: {
              keyboard: [
                ["🚖 Заказать поездку"],
                ["💰 Рассчитать стоимость"],
                ["🌍 Междугородние маршруты"],
                ["📞 Связаться с диспетчером"],
                ["ℹ️ О компании"]
              ],
              resize_keyboard: true
            }
          })
        });
      } else {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Вы выбрали: ${text}`
          })
        });
      }
    }

    return res.status(200).send("OK");

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
