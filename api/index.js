import { MESSAGES } from "./messages.js";
import { getState, setState, clearState } from "./state.js";
import { getOrder, setOrder, clearOrder } from "./orders.js";

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

  const state = getState(chatId);
  const order = getOrder(chatId);

  const keyboard = {
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

  let message = "";

  if (text === "/start") {

    clearState(chatId);
    clearOrder(chatId);

    message = MESSAGES.welcome;
