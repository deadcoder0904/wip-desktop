import gql from "graphql-tag";

export const SWITCH_STATUS = gql`
  mutation switchStatus($id: String!) {
    switchStatus(id: $id) @client
  }
`;
