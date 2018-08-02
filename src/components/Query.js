import React from "react";
import { Query } from "react-apollo";
import Loading from "./Loading";

const ModifiedQuery = ({ children, ...props }) => {
  return (
    <Query {...props}>
      {({ loading, error, data, fetchMore, client }) => {
        if (loading) {
          return <Loading type="bars" width={100} height={100} />;
        }
        if (error) return `Error!: ${error}`;
        return children({
          data,
          fetchMore,
          client
        });
      }}
    </Query>
  );
};

export default ModifiedQuery;
