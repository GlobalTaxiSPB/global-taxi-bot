const state = new Map();

export function getState(chatId) {
  return state.get(chatId) || {};
}

export function setState(chatId, data) {
  state.set(chatId, {
    ...getState(chatId),
    ...data,
  });
}

export function clearState(chatId) {
  state.delete(chatId);
}
