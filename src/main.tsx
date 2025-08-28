// Include Telegram UI styles first to allow our code override the package CSS.

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { init } from "./init.ts";
import "@/shared/styles/index.css";
import TelegramDemo from "./pages/TelegramDemo.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug =
    (launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
    import.meta.env.DEV;

  // Configure all application dependencies.
  await init({
    debug,
    eruda: debug && ["ios", "android"].includes(platform),
    mockForMacOS: platform === "macos",
  }).then(() => {
    root.render(
      <StrictMode>
        <div className="flex justify-center items-center h-screen w-full">
          <div className="flex flex-col gap-2">
            <TelegramDemo />
          </div>
        </div>
      </StrictMode>
    );
  });
} catch (e) {
  root.render(<>Error: env not supported</>);
}
