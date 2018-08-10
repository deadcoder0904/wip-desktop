import gql from "graphql-tag";

export const GET_TODOS_BY_PRODUCT = gql`
  query getTodosByProduct(
    $id: ID!
    $completed: Boolean = false
    $limit: Int = 100
  ) {
    product(id: $id) {
      hashtag
      todos(completed: $completed, limit: $limit) {
        id
        body
        completed_at
      }
    }
  }
`;
