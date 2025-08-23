import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';

// 開発モード判定
const isDev = process.env.NODE_ENV === 'development';

function createMainWindow(): BrowserWindow {
  // メインウィンドウの作成
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // セキュリティ設定
      contextIsolation: true,           // Context分離有効
      nodeIntegration: false,           // Node.js統合無効
      sandbox: false,                   // TODO: 後でtrueに変更
      webSecurity: true,                // Web セキュリティ有効
      allowRunningInsecureContent: false, // 非セキュアコンテンツ禁止
      experimentalFeatures: false,      // 実験的機能無効
      
      // プリロード設定（後で追加）
      // preload: path.join(__dirname, 'preload.js'),
    },
    // ウィンドウ設定
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false, // ready-to-showまで表示しない
  });

  // コンテンツ読み込み
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    // 開発時はDevToolsを開く
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // ウィンドウが準備できたら表示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  return mainWindow;
}

// アプリケーション準備完了時
app.whenReady().then(() => {
  createMainWindow();

  // macOS用：ドックからの再アクティベーション
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// 全ウィンドウが閉じられた時
app.on('window-all-closed', () => {
  // macOS以外では終了
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// セキュリティ設定：新しいウィンドウのブロック
app.on('web-contents-created', (_event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // 外部URLを新しいウィンドウで開くことを禁止
    return { action: 'deny' };
  });
});

// メニュー無効化（後で再設定）
if (!isDev) {
  Menu.setApplicationMenu(null);
}