import gql from "graphql-tag";

export const GET_STATUS = gql`
  query getStatus {
    status @client
  }
`;
