import React from "react";
import styled from "react-emotion";

import { state } from "../utils/state";

import Query from "../components/Query";
import { Main } from "../components/Main";
import { Sidebar } from "../components/Sidebar";

import { GET_ALL_PRODUCTS } from "../graphql/queries/GET_ALL_PRODUCTS";
import { GET_TODOS_BY_PRODUCT } from "../graphql/queries/GET_TODOS_BY_PRODUCT";

const Container = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`;

export class Home extends React.Component {
  state = {
    selectedProduct: state.get("selectedProduct")
  };

  render() {
    const { selectedProduct } = this.state;
    return (
      <Container>
        <Query
          query={GET_ALL_PRODUCTS}
          variables={{ id: state.get("user.id") }}
        >
          {({ data: { user } }) => {
            if (!selectedProduct)
              state.set({
                selectedProduct: user.products ? user.products[1] : []
              });
            {
              /* return (
              <Query
                query={GET_TODOS_BY_PRODUCT}
                variables={{
                  id: !selectedProduct
                    ? user.products[0].id
                    : selectedProduct.id,
                  completed: true
                }}
              >
                {({ data: { product } }) => {
                  return (
                    <>
                      <Sidebar products={user.products} />;
                      <Main product={product} />
                    </>
                  );
                }}
              </Query>
            ); */
            }
            return (
              <>
                <Sidebar products={user.products} />
                <Main
                  id={
                    !selectedProduct ? user.products[0].id : selectedProduct.id
                  }
                />
              </>
            );
          }}
        </Query>
      </Container>
    );
  }
}
