import React from "react";
import { Query as RAQuery } from "react-apollo";

import { Loading } from "./Loading/index";

export const Query = ({ children, ...props }) => {
  return (
    <RAQuery {...props}>
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
    </RAQuery>
  );
};
