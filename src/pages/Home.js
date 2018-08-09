import React from "react";
import styled from "react-emotion";
import { withTheme } from "emotion-theming";
import { Query, ApolloConsumer } from "react-apollo";

import { Main } from "../components/Main/index";
import { Sidebar } from "../components/Sidebar/index";
import { Loading } from "../components/Loading/index";
import { Error } from "../components/Error/index";

import { GET_ALL_PRODUCTS } from "../graphql/queries/GET_ALL_PRODUCTS";
import { GET_TODOS_BY_PRODUCT } from "../graphql/queries/GET_TODOS_BY_PRODUCT";
import { SWITCH_SELECTED_PRODUCT } from "../graphql/mutation/Local/SWITCH_SELECTED_PRODUCT";

import { state } from "../utils/state";

const Container = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`;

class HomeContainer extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <Container>
        <Query
          query={GET_ALL_PRODUCTS}
          variables={{ id: state.get("user.id") }}
        >
          {({ data: { user }, loading, error }) => {
            if (loading)
              return (
                <Loading
                  color={theme.loading.color}
                  type="bubbles"
                  width={100}
                  height={100}
                />
              );
            if (error) return <Error err={error} />;
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

export const Home = withTheme(HomeContainer);
