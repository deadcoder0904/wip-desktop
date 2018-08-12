import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query getProducts($id: ID!, $limit: Int, $offset: Int) {
    user(id: $id) {
      products {
        name
        website_url
        todos(limit: $limit, offset: $offset) {
          body
        }
      }
    }
  }
`;
