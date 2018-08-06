import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, concat } from "apollo-link";
import { withClientState } from "apollo-link-state";
import gql from "graphql-tag";

import { state } from "./state";

import { GET_SELECTED_PRODUCT } from "../graphql/mutation/Local/SWITCH_SELECTED_PRODUCT";
import { GET_TODOS_BY_PRODUCT } from "../graphql/queries/GET_TODOS_BY_PRODUCT";

const selectedProduct = state.get("selectedProduct");
const defaultState = {
  selectedProduct: selectedProduct || {
    id: null,
    name: "",
    __typename: "SelectedProduct"
  }
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
        const previous = cache.readQuery({ query });
        const data = { selectedProduct: { id, name, __typename: "Product" } };
        state.set(data);
        cache.writeQuery({ query, data });
        return null;
      },
      getTodos: (_, { name, todos }, { cache }) => {
        const query = GET_TODOS;
        const previous = cache.readQuery({ query });
        const data = { todos };
        store.set(`${name}.todos`, todos);
        cache.writeQuery({ query, data });
        return null;
      }
    }
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${state.get("token")}`,
      "Access-Control-Allow-Origin": "*"
    }
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: "https://wip.chat/graphql"
});

export const client = new ApolloClient({
  link: concat(
    authMiddleware,
    ApolloLink.from([errorLink, stateLink, httpLink])
  ),
  cache
});