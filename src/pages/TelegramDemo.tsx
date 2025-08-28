import getTelegramUser from "@/shared/helpers/getTelegramUser";
import { useTelegram } from "@/shared/hooks/useTelegram";
import { useEffect, useState } from "react";

export default function TelegramDemo() {
  useTelegram();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getTelegramUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">
        Пример интеграции useTelegram()
      </h2>
      {user ? (
        <div>
          <div>ID: {user.id}</div>
          <div>Имя: {user.first_name}</div>
          <div>Username: {user.username}</div>
        </div>
      ) : (
        <div>Пользователь Telegram не найден или не открыт в WebApp</div>
      )}
    </div>
  );
}
