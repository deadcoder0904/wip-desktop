import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, concat } from "apollo-link";
import { withClientState } from "apollo-link-state";
import gql from "graphql-tag";

import { state } from "./state";

const defaultState = {
  mode: state.get("theme") || "LIGHT",
  status: state.get("status") || "PENDING",
  selectedProduct: state.get("selectedProduct") || null,
};

const cache = new InMemoryCache();

const stateLink = withClientState({
  defaults: defaultState,
  cache,
  resolvers: {
    Mutation: {
      switchSelectedProduct: (_, { id, name }, { cache }) => {
        const query = gql`
          query GetSelectedProduct {
            selectedProduct @client {
              id
              name
            }
          }
        `;
        const data = { selectedProduct: { id, name, __typename: "Product" } };
        cache.writeQuery({ query, data });
        return null;
      },
      switchMode: (_, __, { cache }) => {
        const query = gql`
          query getMode {
            mode @client
          }
        `;
        const previous = cache.readQuery({ query });
        const data = { mode: previous.mode === "LIGHT" ? "DARK" : "LIGHT" };
        cache.writeQuery({ query, data });
        return null;
      },
      setStatus: (_, { status }, { cache }) => {
        const query = gql`
          query getStatus {
            status @client
          }
        `;
        const data = {
          status,
        };
        cache.writeQuery({ query, data });
        return null;
      },
    },
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${state.get("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        )
      );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: "https://wip.chat/graphql",
});

export const client = new ApolloClient({
  link: concat(
    authMiddleware,
    ApolloLink.from([errorLink, stateLink, httpLink])
  ),
  cache,
});
