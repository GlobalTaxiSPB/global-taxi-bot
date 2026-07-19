const orders = new Map();

export function getOrder(chatId) {
  return orders.get(chatId) || {};
}

export function setOrder(chatId, data) {
  orders.set(chatId, {
    ...getOrder(chatId),
    ...data,
  });
}

export function clearOrder(chatId) {
  orders.delete(chatId);
}
