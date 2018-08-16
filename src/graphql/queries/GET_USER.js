import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser {
    viewer {
      id
    }
  }
`;
