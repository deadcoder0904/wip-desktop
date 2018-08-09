import React from "react";
import styled from "react-emotion";
import { ApolloConsumer } from "react-apollo";

import { Query } from "../components/Query";
import { Main } from "../components/Main/index";
import { Sidebar } from "../components/Sidebar/index";
import { Loading } from "../components/Loading/index";

import { GET_ALL_PRODUCTS } from "../graphql/queries/GET_ALL_PRODUCTS";
import { GET_TODOS_BY_PRODUCT } from "../graphql/queries/GET_TODOS_BY_PRODUCT";
import { SWITCH_SELECTED_PRODUCT } from "../graphql/mutation/Local/SWITCH_SELECTED_PRODUCT";

import { state } from "../utils/state";

const Container = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`;

export class Home extends React.Component {
  render() {
    return (
      <Container>
        <Query
          query={GET_ALL_PRODUCTS}
          variables={{ id: state.get("user.id") }}
        >
          {({ data: { user } }) => {
            const { id, name } = user.products ? user.products[0] : [];
            return (
              <>
                <Sidebar products={user.products} />
                <Main id={id} name={name} />
              </>
            );
          }}
        </Query>
      </Container>
    );
  }
}
