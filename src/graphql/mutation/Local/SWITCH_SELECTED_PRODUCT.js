import gql from "graphql-tag";

export const SWITCH_SELECTED_PRODUCT = gql`
  mutation switchSelectedProduct($id: ID!, $name: String!) {
    switchSelectedProduct(id: $id, name: $name) @client
  }
`;
