import gql from "graphql-tag";

export const SWITCH_MODE = gql`
  mutation switchMode($id: String!) {
    switchMode(id: $id) @client
  }
`;
