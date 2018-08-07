import gql from "graphql-tag";

const completedAt = JSON.stringify(new Date().toISOString());

export const CREATE_TODO = gql`
  mutation createTodo($body: String!) {
    createTodo(input: { body: $body, completed_at: ${completedAt} }) {
      id
      body
    }
  }
`;
