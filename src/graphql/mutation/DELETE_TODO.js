import gql from "graphql-tag";

export const DELETE_TODO = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id)
  }
`;
