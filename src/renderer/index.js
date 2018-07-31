import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, concat, from } from "apollo-link";
import { ApolloProvider } from "react-apollo";

import { Home } from "../components/Home";
import { Token } from "../components/Token";

import { config } from "../config/index";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${config.get("token")}`,
      "Access-Control-Allow-Origin": "*"
    }
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: "https://wip.chat/graphql"
});

const client = new ApolloClient({
  link: concat(authMiddleware, from([errorLink, httpLink])),
  cache: new InMemoryCache()
});

const App = () => (
  <Router>
    <Token path="/" />
    <Home path="/home" />
  </Router>
);

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector("#app")
);
