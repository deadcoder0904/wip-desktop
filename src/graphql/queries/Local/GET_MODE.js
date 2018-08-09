import gql from "graphql-tag";

export const GET_MODE = gql`
  query getMode {
    mode @client
  }
`;
