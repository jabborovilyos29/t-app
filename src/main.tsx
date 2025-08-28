// Include Telegram UI styles first to allow our code override the package CSS.

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { init } from "./init.ts";
import "@/shared/styles/index.css";

// Mock the environment in case, we are outside Telegram.

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
            <h1>Name: {launchParams?.tgWebAppData?.user?.first_name}</h1>
            <h1>Is bot ?: {launchParams?.tgWebAppData?.user?.is_bot}</h1>
            <h1>Last Name: {launchParams?.tgWebAppData?.user?.last_name}</h1>
            <h1>Username: {launchParams?.tgWebAppData?.user?.username}</h1>
            <h1>Language: {launchParams?.tgWebAppData?.user?.language_code}</h1>
          </div>
        </div>
      </StrictMode>
    );
  });
} catch (e) {
  root.render(<>Error: env not supported</>);
}
