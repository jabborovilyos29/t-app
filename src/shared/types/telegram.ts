export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface TelegramChat {
  id: number;
  type: "group" | "supergroup" | "channel";
  title: string;
  username?: string;
  photo_url?: string;
}

export interface TelegramInitDataUnsafe {
  query_id?: string;
  user?: TelegramUser;
  receiver?: TelegramUser;
  chat?: TelegramChat;
  start_param?: string;
  can_send_after?: number;
  auth_date: string;
  hash: string;
}

export interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

export interface TelegramMainButton {
  text: string;
  color: string;
  text_color: string;
  is_visible: boolean;
  is_active: boolean;
  is_progress_visible: boolean;

  setText(text: string): TelegramMainButton;
  onClick(callback: () => void): TelegramMainButton;
  offClick(callback: () => void): TelegramMainButton;
  show(): TelegramMainButton;
  hide(): TelegramMainButton;
  enable(): TelegramMainButton;
  disable(): TelegramMainButton;
  showProgress(leaveActive?: boolean): TelegramMainButton;
  hideProgress(): TelegramMainButton;
}

export interface TelegramBackButton {
  is_visible: boolean;

  onClick(callback: () => void): TelegramBackButton;
  offClick(callback: () => void): TelegramBackButton;
  show(): TelegramBackButton;
  hide(): TelegramBackButton;
}

export interface TelegramHapticFeedback {
  impactOccurred(style?: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
  notificationOccurred(type: "error" | "success" | "warning"): void;
  selectionChanged(): void;
}

export interface TelegramCloudStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error?: string, success?: boolean) => void
  ): void;
  getItem(
    key: string,
    callback: (error?: string, value?: string) => void
  ): void;
  getItems(
    keys: string[],
    callback: (error?: string, values?: Record<string, string>) => void
  ): void;
  removeItem(
    key: string,
    callback?: (error?: string, success?: boolean) => void
  ): void;
  removeItems(
    keys: string[],
    callback?: (error?: string, success?: boolean) => void
  ): void;
  getKeys(callback: (error?: string, keys?: string[]) => void): void;
}

export interface TelegramWebApp {
  // данные
  initData: string;
  initDataUnsafe: TelegramInitDataUnsafe;

  // общие параметры
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: TelegramThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;

  // основные методы
  ready(): void;
  expand(): void;
  close(): void;
  disableClosingConfirmation(): void;
  enableClosingConfirmation(): void;

  // UI
  MainButton: TelegramMainButton;
  BackButton: TelegramBackButton;
  HapticFeedback: TelegramHapticFeedback;

  // Хранилище
  CloudStorage: TelegramCloudStorage;

  // события
  onEvent(eventType: string, callback: (...args: any[]) => void): void;
  offEvent(eventType: string, callback: (...args: any[]) => void): void;
  sendData(data: string): void;

  // дополнительные методы
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  showPopup(
    params: {
      title?: string;
      message: string;
      buttons?: Array<{
        id: string;
        type?: "default" | "ok" | "close" | "cancel" | "destructive";
        text: string;
      }>;
    },
    callback?: (buttonId: string) => void
  ): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(
    params: { text?: string },
    callback?: (data: string) => void
  ): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback: (text: string) => void): void;
}

export interface TelegramNamespace {
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram?: TelegramNamespace;
  }
}
