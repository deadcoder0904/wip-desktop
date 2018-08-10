import gql from "graphql-tag";

export const CREATE_TODO = gql`
  mutation createTodo($body: String!, $completedAt: DateTime) {
    createTodo(input: { body: $body, completed_at: $completedAt }) {
      id
      body
      completed_at
    }
  }
`;
