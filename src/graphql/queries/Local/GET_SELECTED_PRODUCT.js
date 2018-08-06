import gql from "graphql-tag";

export const GET_SELECTED_PRODUCT = gql`
  query GetSelectedProduct {
    selectedProduct @client {
      id
      name
    }
  }
`;
