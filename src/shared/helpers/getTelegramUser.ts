export function getTelegramUser() {
  if (
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initDataUnsafe
  ) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
}
