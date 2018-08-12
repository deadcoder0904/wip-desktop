import React from "react";
import styled from "react-emotion";
import { Mutation } from "react-apollo";
import { withTheme } from "emotion-theming";
import reactStringReplace from "react-string-replace";
import { v4 } from "uuid";
import { Icon } from "react-icons-kit";
import { checkmark } from "react-icons-kit/icomoon/checkmark";
import { cross } from "react-icons-kit/icomoon/cross";

import { DeleteTodo } from "./DeleteTodo";

import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";
import { COMPLETE_TODO } from "../../graphql/mutation/COMPLETE_TODO";
import { UNCOMPLETE_TODO } from "../../graphql/mutation/UNCOMPLETE_TODO";

const TodoContainer = styled.li`
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

class TodoBoxContainer extends React.Component {
  _getHashtag = (body, hashtag) => {
    return reactStringReplace(body, `#${hashtag}`, (match, i) => (
      <Hashtag key={v4()}>{match}</Hashtag>
    ));
  };

  render() {
    const { status, todo, hashtag, productId, theme } = this.props;
    const completed_at = completed ? new Date().toISOString() : null;
    const completed = status === "DONE";
    return (
      <Mutation
        key={v4()}
        mutation={completed ? UNCOMPLETE_TODO : COMPLETE_TODO}
        optimisticResponse={{
          __typename: "Mutation",
          [completed ? "uncompleteTodo" : "completeTodo"]: {
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

          const todos1 = cacheData1.product.todos.filter(t => t.id !== todo.id); // make a shallow copy otherwise error "Object is not extensible" is thrown

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

          const todos2 = cacheData2.product.todos.map(t => t); // make a shallow copy otherwise error "Object is not extensible" is thrown
          todos2.push({
            ...data[completed ? "uncompleteTodo" : "completeTodo"],
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
          <TodoContainer>
            <StatusIcon
              onClick={() => {
                mutate({ variables: { id: todo.id } });
              }}
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
              <DeleteTodo
                id={todo.id}
                productId={productId}
                completed={completed}
              />
            </Todo>
          </TodoContainer>
        )}
      </Mutation>
    );
  }
}

export const TodoBox = withTheme(TodoBoxContainer);
