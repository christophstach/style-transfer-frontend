interface ShareData {
  files?: File[];
  title?: string;
  text?: string;
  url?: string;
}

interface ExtendedNavigator extends Navigator {
  canShare?: (shareData: ShareData) => boolean;
  share?: (shareData: ShareData) => Promise<void>;
}

interface ExtendedWindow extends Window {
  navigator: ExtendedNavigator;
}
