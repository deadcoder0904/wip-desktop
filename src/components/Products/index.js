import React from "react";
import styled from "react-emotion";
import { Mutation } from "react-apollo";
import { v4 } from "uuid";

import { Query } from "../Query";
import { SearchBar } from "../SearchBar/index";

import { SWITCH_SELECTED_PRODUCT } from "../../graphql/mutation/Local/SWITCH_SELECTED_PRODUCT";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/Local/GET_SELECTED_PRODUCT";
import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";
import { GET_STATUS } from "../../graphql/queries/Local/GET_STATUS";

import { state } from "../../utils/state";

const Container = styled.ul`
  padding-left: 2rem;
`;

const Product = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  height: 3.5rem;
`;

const Name = styled.div`
  color: ${props =>
    props.highlight
      ? props.theme.sidebar.highlightColor
      : props.theme.sidebar.textColor};
  font-family: ${props => props.theme.global.fontFamily};
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
    const { input } = this.state;
    const { products } = this.props;

    return (
      <>
        <SearchBar
          input={input}
          onInputChange={this._onInputChange}
          clearInput={this._clearInput}
        />
        <Query query={GET_SELECTED_PRODUCT}>
          {({ data: { selectedProduct } }) => (
            <Container>
              {this._filterProducts(products, input).map((product, i) => (
                <Query query={GET_STATUS} key={v4()}>
                  {({ data: { status } }) => (
                    <Mutation
                      mutation={SWITCH_SELECTED_PRODUCT}
                      // refetchQueries={[
                      //   {
                      //     query: GET_TODOS_BY_PRODUCT,
                      //     variables: {
                      //       id: product.id,
                      //       completed: status === "DONE"
                      //     }
                      //   }
                      // ]}
                    >
                      {mutate => {
                        const highlightedProduct = selectedProduct
                          ? product.name === selectedProduct.name
                          : i === 0;
                        return (
                          <Product
                            onClick={() => {
                              if (highlightedProduct) return;
                              mutate({
                                variables: {
                                  id: product.id,
                                  name: product.name
                                }
                              });
                            }}
                          >
                            <Name highlight={highlightedProduct}>
                              {product.name}
                            </Name>
                          </Product>
                        );
                      }}
                    </Mutation>
                  )}
                </Query>
              ))}
            </Container>
          )}
        </Query>
      </>
    );
  }
}
