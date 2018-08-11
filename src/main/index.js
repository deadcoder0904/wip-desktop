import { app, BrowserWindow, Menu, shell } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import { answerRenderer, callRenderer } from "electron-better-ipc";
import { autoUpdater } from "electron-updater";
const isDevelopment = process.env.NODE_ENV !== "production";

import { createMenu } from "./menu";
import { createMainWindow } from "./createWindow";
import { electronUpdater } from "./autoUpdater";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow(mainWindow);
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow(mainWindow);
  createMenu();
  electronUpdater(mainWindow);
  autoUpdater.checkForUpdatesAndNotify();
});

answerRenderer("app-quit", () => {
  app.quit();
});

answerRenderer("app-minimize", () => {
  if (!mainWindow.isMinimized()) {
    mainWindow.minimize();
  } else {
    mainWindow.restore();
  }
});

answerRenderer("app-maximize", () => {
  if (!mainWindow.isFullScreen()) {
    mainWindow.setFullScreen(true);
  } else {
    mainWindow.setFullScreen(false);
  }
});
