import Store from "electron-store";

export const state = new Store({
  themeName: "LIGHT"
});

// if (process.env.NODE_ENV === "development") {
//   state.clear();
// }

state.onDidChange("selectedProduct", (newProduct, oldProduct) => {
  state.set({
    selectedProduct: newProduct
  });
});
