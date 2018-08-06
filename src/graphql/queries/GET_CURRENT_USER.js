import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  query {
    viewer {
      id
      first_name
      last_name
      products {
        id
        hashtag
        name
        url
        website_url
        todos(limit: 100) {
          id
          body
          completed_at
        }
      }
      url
      username
    }
  }
`;
