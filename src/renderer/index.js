import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "emotion-theming";

import Global from "../styles/injectGlobal";
import { theme } from "../styles/theme";

import { Home } from "../pages/Home";
import { Token } from "../pages/Token";
import { Titlebar } from "../components/Titlebar/index";
import { Query } from "../components/Query";

import { client } from "../utils/stateLink";
import { GET_MODE } from "../graphql/queries/Local/GET_MODE";

const App = () => (
  <ApolloProvider client={client}>
    <Query query={GET_MODE}>
      {({ data: { mode } }) => (
        <ThemeProvider theme={theme[mode]}>
          <Global>
            <>
              <Titlebar />
              <Router>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/" component={Token} />
                </Switch>
              </Router>
            </>
          </Global>
        </ThemeProvider>
      )}
    </Query>
  </ApolloProvider>
);

render(<App />, document.querySelector("#app"));
