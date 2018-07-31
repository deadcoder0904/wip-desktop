import React from "react";
import { Query } from "react-apollo";

import { GET_PRODUCTS } from "../graphql/queries/GetProducts";

export const Home = () => <Query query={GET_PRODUCTS} />;
