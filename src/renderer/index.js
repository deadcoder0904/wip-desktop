import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "emotion-theming";

import Global from "../styles/injectGlobal";
import { theme } from "../styles/theme";

import { Home } from "../pages/Home";
import { Token } from "../pages/Token";
import { Titlebar } from "../components/Titlebar";

import { client } from "../utils/stateLink";

class App extends React.Component {
  state = {
    isLight: true,
    theme: theme.LIGHT
  };

  _toggleTheme = () => {
    const { isLight } = this.state;
    const newTheme = isLight ? theme.DARK : theme.LIGHT;
    this.setState({ isLight: !isLight, theme: newTheme });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={this.state.theme}>
          <Global>
            <>
              <Titlebar />
              <Router>
                <Home path="/home" />
                <Token path="/" />
              </Router>
            </>
          </Global>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

render(<App />, document.querySelector("#app"));
