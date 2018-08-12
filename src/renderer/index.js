import React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, Query } from "react-apollo";
import { ThemeProvider } from "emotion-theming";

import { Home } from "../pages/Home";
import { Token } from "../pages/Token";

import { Titlebar } from "../components/Titlebar/index";
import { Loading } from "../components/Loading/index";
import { Error } from "../components/Error/index";

import { GET_MODE } from "../graphql/queries/Local/GET_MODE";

import Global from "../styles/injectGlobal";
import { theme } from "../styles/theme";

import { client } from "../utils/stateLink";

const App = () => (
  <ApolloProvider client={client}>
    <Query query={GET_MODE}>
      {({ data: { mode }, loading, error }) => {
        if (loading)
          return (
            <Loading
              color={mode === "DARK" ? "#ffffff" : "#000000"}
              type="bars"
              width={100}
              height={100}
            />
          );
        if (error) return <Error err={error} />;
        return (
          <ThemeProvider theme={theme[mode]}>
            <Global>
              <React.Fragment>
                <Titlebar />
                <Router>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/" component={Token} />
                  </Switch>
                </Router>
              </React.Fragment>
            </Global>
          </ThemeProvider>
        );
      }}
    </Query>
  </ApolloProvider>
);

render(<App />, document.querySelector("#app"));
