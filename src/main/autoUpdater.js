import { autoUpdater } from "electron-updater";
import log from "electron-log";

export class AppUpdater {
  constructor() {
    const log = require("electron-log");
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
