import gql from "graphql-tag";

export const SET_STATUS = gql`
  mutation setStatus($status: String!) {
    setStatus(status: $status) @client
  }
`;
