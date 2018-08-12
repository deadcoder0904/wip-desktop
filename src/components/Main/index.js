import React from "react";
import styled from "react-emotion";
import { v4 } from "uuid";
import { Query, Mutation } from "react-apollo";
import { withTheme } from "emotion-theming";

import { CreateTodo } from "./CreateTodo";
import { TodoBox } from "./TodoBox";
import { Loading } from "../Loading/index";
import { Error } from "../Error/index";
import { Status } from "./Status";

import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/Local/GET_SELECTED_PRODUCT";
import { GET_STATUS } from "../../graphql/queries/Local/GET_STATUS";

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

const MainContainer = ({ id, theme }) => (
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
                return (
                  <Content>
                    <Status />
                    <Todos>
                      {todos.map(todo => (
                        <TodoBox
                          key={v4()}
                          todo={todo}
                          hashtag={hashtag}
                          productId={productId}
                          status={status}
                        />
                      ))}
                    </Todos>
                    <Bg>
                      <CreateTodo productId={productId} />
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

export const Main = withTheme(MainContainer);
