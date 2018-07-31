import Store from "electron-store";

export const config = new Store({
  defaults: {
    theme: "light"
  }
});
