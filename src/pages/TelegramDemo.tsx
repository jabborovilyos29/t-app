import { initDataState } from "@telegram-apps/sdk-react";

export default function TelegramDemo() {


  return (
    <div className="p-4">
      <code>{initDataState && <pre>{JSON.stringify({...initDataState}, null, 2)}</pre>}</code>
    </div>
  );
}
