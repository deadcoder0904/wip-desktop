import gql from "graphql-tag";

export const COMPLETE_TODO = gql`
  mutation completeTodo($id: ID!) {
    completeTodo(id: $id) {
      body
    }
  }
`;
