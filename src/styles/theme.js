const fontFamily = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;`;

export const theme = {
  LIGHT: {
    global: {
      textColor: "#111",
      bgColor: "#fff",
      fontFamily
    },
    titlebar: {
      bgColor: "#fcfcfc",
      height: "2.5rem"
    },
    navbar: {
      bgColor: "#fff"
    },
    search: {
      icon: "#b6b6b6",
      textColor: "#777",
      bgColor: "#fff"
    },
    addTodo: {
      icon: "#b6b6b6",
      textColor: "#777",
      bgColor: "#f9f9f9"
    },
    sidebar: {
      textColor: "#aaa",
      highlightColor: "#111",
      bgColor: "#fcfcfc",
      width: "25rem"
    },
    hashtag: {
      textColor: "#111",
      bgColor: "#fff",
      underlineColor: "#aaa"
    },
    loading: {
      color: "#000000"
    }
  },
  DARK: {
    global: {
      textColor: "#dadada",
      bgColor: "#222",
      fontFamily
    },
    titlebar: {
      bgColor: "#222",
      height: "2.5rem"
    },
    navbar: {
      bgColor: "#222"
    },
    search: {
      icon: "#b6b6b6",
      textColor: "#dadada",
      bgColor: "#333"
    },
    addTodo: {
      icon: "#b6b6b6",
      textColor: "#dadada",
      bgColor: "#333"
    },
    sidebar: {
      textColor: "#bbb",
      highlightColor: "#fff",
      bgColor: "#111",
      width: "25rem"
    },
    hashtag: {
      textColor: "#dadada",
      bgColor: "#222",
      underlineColor: "#dadada"
    },
    loading: {
      color: "#ffffff"
    }
  }
};
