import React from "react";
import styled from "react-emotion";
import { withTheme } from "emotion-theming";
import { Query, Mutation } from "react-apollo";
import Icon from "react-icons-kit";
import { bin } from "react-icons-kit/icomoon/bin";

import { DELETE_TODO } from "../../graphql/mutation/DELETE_TODO";
import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";

const BinIcon = styled(Icon)`
  padding-left: 1rem;
`;

const DeleteTodoContainer = ({ id, productId, completed, theme }) => {
  return (
    <Mutation
      mutation={DELETE_TODO}
      optimisticResponse={{
        __typename: "Mutation",
        deleteTodo: {
          __typename: "Todo",
          id,
        },
      }}
      update={(cache, { data }) => {
        // delete todo item
        const cacheData = cache.readQuery({
          query: GET_TODOS_BY_PRODUCT,
          variables: {
            id: productId,
            completed,
          },
        });

        const todos = cacheData.product.todos.filter(t => t.id !== id); // make a shallow copy otherwise error "Object is not extensible" is thrown

        const newData = {
          ...cacheData,
          product: {
            ...cacheData.product,
            todos: todos,
          },
        };

        cache.writeQuery({
          query: GET_TODOS_BY_PRODUCT,
          variables: {
            id: productId,
            completed,
          },
          data: newData,
        });
      }}
    >
      {mutate => (
        <BinIcon
          onClick={() => {
            mutate({ variables: { id } });
          }}
          icon={bin}
          color={theme.binIcon.color}
          size={16}
        />
      )}
    </Mutation>
  );
};

export const DeleteTodo = withTheme(DeleteTodoContainer);
