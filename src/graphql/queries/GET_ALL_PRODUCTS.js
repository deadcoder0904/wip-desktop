import gql from "graphql-tag";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($id: ID!) {
    user(id: $id) {
      products {
        id
        name
      }
    }
  }
`;
