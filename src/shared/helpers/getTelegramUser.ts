async function getTelegramUser() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return null;

  tg.ready();
  console.log(tg.initDataUnsafe);

  return tg.initDataUnsafe.user || "test";
}

export default getTelegramUser;
