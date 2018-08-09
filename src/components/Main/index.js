import React from "react";
import styled from "react-emotion";
import reactStringReplace from "react-string-replace";
import { v4 } from "uuid";
import { Query, Mutation } from "react-apollo";
import { withTheme } from "emotion-theming";

import { CreateTodo } from "./CreateTodo";
import { Loading } from "../Loading/index";
import { Error } from "../Error/index";
import { Status } from "./Status";

import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/Local/GET_SELECTED_PRODUCT";

import { state } from "../../utils/state";

const Content = styled.div`
  background: ${props => props.theme.global.bgColor};
  height: 100vh;
  flex: 1;
  position: absolute;
  top: ${props => props.theme.titlebar.height};
  left: ${props => props.theme.sidebar.width};
  width: calc(100% - ${props => props.theme.sidebar.width});
`;

const Bg = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
  background: ${props => props.theme.sidebar.bgColor};
  width: calc(100% - ${props => props.theme.sidebar.width});
  height: 5rem;
  display: flex;
  align-items: center;
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
  font-family: ${props => props.theme.global.fontFamily};
  font-weight: 300;
  line-height: 2;
`;

const Hashtag = styled.span`
  color: ${props => props.theme.hashtag.textColor};
  background: ${props => props.theme.hashtag.bgColor};
  border-bottom: 0.1rem solid ${props => props.theme.hashtag.underlineColor};
  padding: 0.3rem;
`;

class MainContainer extends React.Component {
  _getHashtag = (body, hashtag) => {
    return reactStringReplace(body, `#${hashtag}`, (match, i) => (
      <Hashtag key={v4()}>{match}</Hashtag>
    ));
  };

  render() {
    const { id, theme } = this.props;
    return (
      <Query query={GET_SELECTED_PRODUCT}>
        {({ data: { selectedProduct }, loading, error }) => {
          if (loading)
            return (
              <Loading
                color={theme.loading.color}
                type="spinningBubbles"
                width={100}
                height={100}
              />
            );
          if (error) return <Error err={error} />;
          const productId = !selectedProduct ? id : selectedProduct.id;
          return (
            <Query query={GET_TODOS_BY_PRODUCT} variables={{ id: productId }}>
              {({ data: { product }, loading, error }) => {
                if (loading)
                  return (
                    <Loading
                      color={theme.loading.color}
                      type="spinningBubbles"
                      width={100}
                      height={100}
                    />
                  );
                if (error) return <Error err={error} />;
                const { todos, hashtag } = product;
                return (
                  <Content>
                    <Status />
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
                      <CreateTodo id={productId} />
                    </Bg>
                  </Content>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export const Main = withTheme(MainContainer);
