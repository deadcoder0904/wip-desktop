import gql from "graphql-tag";

export const UNCOMPLETE_TODO = gql`
  mutation uncompleteTodo($id: ID!) {
    uncompleteTodo(id: $id) {
      body
    }
  }
`;
