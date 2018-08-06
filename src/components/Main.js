import React from "react";
import styled from "react-emotion";
import reactStringReplace from "react-string-replace";
import { v4 } from "uuid";
import { Mutation } from "react-apollo";

import { Icon } from "react-icons-kit";
import { pencil2 } from "react-icons-kit/icomoon/pencil2";
import { cross } from "react-icons-kit/icomoon/cross";
import { checkmark2 } from "react-icons-kit/icomoon/checkmark2";

import { state } from "../utils/state";

import Query from "../components/Query";
import Loading from "../components/Loading";

import { GET_PRODUCTS } from "../graphql/queries/GET_PRODUCTS";
import { GET_CURRENT_USER } from "../graphql/queries/GET_CURRENT_USER";
import { CREATE_TODO } from "../graphql/mutation/CREATE_TODO";
import { GET_TODOS_BY_PRODUCT } from "../graphql/queries/GET_TODOS_BY_PRODUCT";

const Content = styled.div`
  background: #fff;
  height: 100vh;
  flex: 1;
  position: absolute;
  top: ${props => props.theme.titleBarHeight};
  left: ${props => props.theme.sideBarWidth};
  width: calc(100% - ${props => props.theme.sideBarWidth});
`;

const Bg = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
  background: ${props => props.theme.sideBarBg};
  width: calc(100% - ${props => props.theme.sideBarWidth});
  height: 5rem;
  display: flex;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: #f7f7f7;
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  color: #777;
  background: transparent;
  border: 0;
  width: 100%;
  font-size: 1.6rem;
`;

const IconContainer = styled.div`
  color: #cacaca;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Todos = styled.ul`
  padding: 1rem;
  margin: 1rem;
  list-style-type: none;
`;

const TodoBox = styled.li`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  padding-right: 1rem;
  display: none;
  + label:before {
    content: "◻️";
  }
  &:checked + label:before {
    content: "✔️";
  }
`;

const Todo = styled.label`
  font-size: 1.6rem;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 300;
  line-height: 2;
`;

const Hashtag = styled.span`
  border-bottom: 0.1rem solid silver;
  padding: 0.3rem;
`;

export class Main extends React.Component {
  state = { input: "" };

  _onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  _onKeyPress = (e, createTodo) => {
    if (e.key === "Enter") {
      createTodo({
        variables: { body: this.state.input }
      });
      this._clearInput();
    }
  };

  _clearInput = () => {
    this.setState({ input: "" });
  };

  _getHashtag = (body, hashtag) => {
    return reactStringReplace(body, `#${hashtag}`, (match, i) => (
      <Hashtag key={v4()}>{match}</Hashtag>
    ));
  };

  render() {
    const { input } = this.state;
    const { todos, hashtag } = this.props;

    {
      /* <Query query={GET_CURRENT_USER}>
    {({ data: { viewer } }) => { */
    }
    return (
      <Content>
        <Todos>
          {todos.map(todo => (
            <TodoBox key={v4()}>
              <CheckBox type="checkbox" id={todo.id} />
              <Todo htmlFor={todo.id}>
                {this._getHashtag(todo.body, hashtag)}
              </Todo>
            </TodoBox>
          ))}
        </Todos>
        <Bg>
          <InputBox>
            <IconContainer>
              <Icon icon={pencil2} size={16} />
            </IconContainer>
            <Mutation
              mutation={CREATE_TODO}
              optimisticResponse={{
                __typename: "Mutation",
                createTodo: {
                  id: v4(),
                  __typename: "Todo",
                  body: input
                }
              }}
              update={(cache, { data: { createTodo } }) => {
                const data = cache.readQuery({
                  query: GET_TODOS_BY_PRODUCT,
                  variables: {
                    id: state.get("selectedProduct.id"),
                    completed: true
                  }
                });
                const newProducts = {
                  product: {
                    hashtag: hashtag,
                    todos: data.product.todos.concat(createTodo),
                    __typename: "Product"
                  }
                };
                console.log({ data, createTodo, newProducts });
                cache.writeQuery({
                  query: GET_TODOS_BY_PRODUCT,
                  data: newProducts
                });
              }}
            >
              {createTodo => (
                <Input
                  placeholder="Add Todo..."
                  value={input}
                  onChange={this._onInputChange}
                  onKeyPress={e => this._onKeyPress(e, createTodo)}
                />
              )}
            </Mutation>
            {input !== "" && (
              <IconContainer onClick={this._clearInput}>
                <Icon icon={cross} size={8} />
              </IconContainer>
            )}
          </InputBox>
        </Bg>
      </Content>
    );
    /* }}
  </Query> */
  }
}
