// import { autoUpdater } from "electron-updater";
// import log from "electron-log";

// export const electronUpdater = win => {
//   autoUpdater.logger = log;
//   autoUpdater.logger.transports.file.level = "info";
//   log.info("App starting...");

//   function sendStatusToWindow(text) {
//     log.info(text);
//     win.webContents.send("autoupdater-message", text);
//   }

//   autoUpdater.on("checking-for-update", () => {
//     sendStatusToWindow("Checking for update...");
//   });

//   autoUpdater.on("update-available", info => {
//     sendStatusToWindow("Update available.");
//   });

//   autoUpdater.on("update-not-available", info => {
//     sendStatusToWindow("Update not available.");
//   });

//   autoUpdater.on("error", err => {
//     sendStatusToWindow("Error in auto-updater. " + err);
//   });

//   autoUpdater.on("download-progress", progressObj => {
//     const log_message = `Download speed: ${
//       progressObj.bytesPerSecond
//     } - Downloaded ${progressObj.percent} % ${log_message} ( ${
//       progressObj.transferred
//     } / ${progressObj.total} )`;
//     sendStatusToWindow(log_message);
//   });

//   autoUpdater.on("update-downloaded", info => {
//     sendStatusToWindow("Update downloaded");
//   });
// };
