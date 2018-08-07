import React from "react";
import styled from "react-emotion";
import { Mutation } from "react-apollo";
import { v4 } from "uuid";

import { state } from "../utils/state";

import Query from "../components/Query";
import { SearchBar } from "../components/SearchBar";

import { SWITCH_SELECTED_PRODUCT } from "../graphql/mutation/Local/SWITCH_SELECTED_PRODUCT";
import { GET_SELECTED_PRODUCT } from "../graphql/queries/Local/GET_SELECTED_PRODUCT";
import { GET_TODOS_BY_PRODUCT } from "../graphql/queries/GET_TODOS_BY_PRODUCT";

const Container = styled.ul`
  padding-left: 2rem;
`;

const Product = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  height: 3.5rem;
  color: ${props => (props.highlight ? "#123456" : "#aaa")};
`;

const Name = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-size: 1.6rem;
  font-weight: 300;
`;

export class Products extends React.Component {
  state = { input: "" };

  _onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  _clearInput = () => {
    this.setState({ input: "" });
  };

  _filterProducts = (products, input) =>
    products.filter(s => s.name.toLowerCase().includes(input.toLowerCase()));

  render() {
    const { input, selectedProductId } = this.state;
    const { products } = this.props;

    return (
      <>
        <SearchBar
          input={input}
          onInputChange={this._onInputChange}
          clearInput={this._clearInput}
        />
        <Query fetchPolicy="cache-and-network" query={GET_SELECTED_PRODUCT}>
          {({ data }) => (
            <Container>
              {this._filterProducts(products, input).map((product, i) => (
                <Mutation
                  fetchPolicy="cache-and-network"
                  key={v4()}
                  mutation={SWITCH_SELECTED_PRODUCT}
                  refetchQueries={result => {
                    console.log("refetchQueries", result, product);
                    state.set({ selectedProduct: product });
                    return [
                      {
                        query: GET_TODOS_BY_PRODUCT,
                        variables: { id: product.id, completed: true }
                      }
                    ];
                  }}
                >
                  {mutate => (
                    <Product
                      onClick={() => {
                        mutate({
                          variables: { id: product.id, name: product.name }
                        });
                      }}
                      highlight={
                        data.selectedProduct
                          ? product.name === data.selectedProduct.name
                          : i === 0
                      }
                    >
                      <Name>{product.name}</Name>
                    </Product>
                  )}
                </Mutation>
              ))}
            </Container>
          )}
        </Query>
      </>
    );
  }
}
