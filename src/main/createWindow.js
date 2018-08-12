import { BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import { callRenderer } from "electron-better-ipc";

const isDevelopment = process.env.NODE_ENV !== "production";

export const createMainWindow = mainWindow => {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    /*
    only setting minWidth or minHeight doesn't work, have to set width & height too
    also setting one of minWidth or minHeight doesn't work, have to set both minWidth & minHeight
    */
    title: "WIP Desktop",
    frame: false,
    icon: path.join(__dirname, "../../build/icon.png"),
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "../renderer/index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  window.on("blur", async () => {
    await callRenderer(window, "window-blur", "true");
  });

  window.on("focus", async () => {
    await callRenderer(window, "window-blur", "false");
  });

  return window;
};
