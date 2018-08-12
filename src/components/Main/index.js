import React from "react";
import styled from "react-emotion";
import reactStringReplace from "react-string-replace";
import { v4 } from "uuid";
import { Query, Mutation } from "react-apollo";
import { withTheme } from "emotion-theming";
import { Icon } from "react-icons-kit";
import { checkmark } from "react-icons-kit/icomoon/checkmark";
import { cross } from "react-icons-kit/icomoon/cross";

import { CreateTodo } from "./CreateTodo";
import { Loading } from "../Loading/index";
import { Error } from "../Error/index";
import { Status } from "./Status";

import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/Local/GET_SELECTED_PRODUCT";
import { GET_STATUS } from "../../graphql/queries/Local/GET_STATUS";
import { COMPLETE_TODO } from "../../graphql/mutation/COMPLETE_TODO";
import { UNCOMPLETE_TODO } from "../../graphql/mutation/UNCOMPLETE_TODO";

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

const StatusIcon = styled(Icon)`
  padding-right: 1rem;
  padding-top: 0.8rem;
  align-self: flex-start;
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
      <Query query={GET_STATUS}>
        {({ data: { status }, loading: loadingStatus, error: errorStatus }) => (
          <Query query={GET_SELECTED_PRODUCT}>
            {({ data: { selectedProduct }, loading, error }) => {
              if (loadingStatus || loading)
                return (
                  <Loading
                    color={theme.loading.color}
                    type="spinningBubbles"
                    width={100}
                    height={100}
                  />
                );
              if (errorStatus || error)
                return <Error err={error ? error : errorStatus} />;
              const productId = !selectedProduct ? id : selectedProduct.id;
              const completed = status === "DONE";
              return (
                <Query
                  query={GET_TODOS_BY_PRODUCT}
                  variables={{ id: productId, completed }}
                >
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
                    const completed_at = completed
                      ? new Date().toISOString()
                      : null;
                    return (
                      <Content>
                        <Status />
                        <Todos>
                          {todos.map(todo => (
                            <Mutation
                              key={v4()}
                              mutation={
                                completed ? UNCOMPLETE_TODO : COMPLETE_TODO
                              }
                              optimisticResponse={{
                                __typename: "Mutation",
                                [completed
                                  ? "uncompleteTodo"
                                  : "completeTodo"]: {
                                  __typename: "Todo",
                                  id: todo.id,
                                  body: todo.body,
                                  completed_at,
                                },
                              }}
                              update={(cache, { data }) => {
                                // remove todo item from current status ,i.e, PENDING or DONE
                                const cacheData1 = cache.readQuery({
                                  query: GET_TODOS_BY_PRODUCT,
                                  variables: {
                                    id: productId,
                                    completed,
                                  },
                                });

                                const todos1 = cacheData1.product.todos.filter(
                                  t => t.id !== todo.id
                                ); // make a shallow copy otherwise error "Object is not extensible" is thrown

                                const newData1 = {
                                  ...cacheData1,
                                  product: {
                                    ...cacheData1.product,
                                    todos: todos1,
                                  },
                                };

                                cache.writeQuery({
                                  query: GET_TODOS_BY_PRODUCT,
                                  variables: {
                                    id: productId,
                                    completed,
                                  },
                                  data: newData1,
                                });

                                // add todo item to current status ,i.e, PENDING or DONE
                                const cacheData2 = cache.readQuery({
                                  query: GET_TODOS_BY_PRODUCT,
                                  variables: {
                                    id: productId,
                                    completed: status !== "DONE",
                                  },
                                });

                                const todos2 = cacheData2.product.todos.map(
                                  t => t
                                ); // make a shallow copy otherwise error "Object is not extensible" is thrown
                                todos2.push({
                                  ...data[
                                    completed
                                      ? "uncompleteTodo"
                                      : "completeTodo"
                                  ],
                                  id: todo.id,
                                  completed_at,
                                });
                                const newData2 = {
                                  ...cacheData2,
                                  product: {
                                    ...cacheData2.product,
                                    todos: todos2,
                                  },
                                };

                                cache.writeQuery({
                                  query: GET_TODOS_BY_PRODUCT,
                                  variables: {
                                    id: productId,
                                    completed: status !== "DONE",
                                  },
                                  data: newData2,
                                });
                              }}
                            >
                              {mutate => (
                                <TodoBox
                                  onClick={() => {
                                    mutate({ variables: { id: todo.id } });
                                  }}
                                >
                                  <StatusIcon
                                    icon={completed ? checkmark : cross}
                                    color={
                                      completed
                                        ? theme.statusIcon.doneColor
                                        : theme.statusIcon.pendingColor
                                    }
                                    size={16}
                                  />
                                  <Todo>
                                    {this._getHashtag(todo.body, hashtag)}
                                  </Todo>
                                </TodoBox>
                              )}
                            </Mutation>
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
        )}
      </Query>
    );
  }
}

export const Main = withTheme(MainContainer);
