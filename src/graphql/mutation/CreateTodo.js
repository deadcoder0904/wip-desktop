import gql from "graphql-tag";

export const CREATE_TODO = gql`
  mutation($body: String!) {
    createTodo(input: { body: $body }) {
      id
      body
    }
  }
`;
