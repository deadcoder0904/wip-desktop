import React from "react";
import styled from "react-emotion";
import { withTheme } from "emotion-theming";
import { Mutation, Query } from "react-apollo";
import { Icon } from "react-icons-kit";
import { pencil2 } from "react-icons-kit/icomoon/pencil2";
import { cross } from "react-icons-kit/icomoon/cross";

import { Loading } from "../Loading/index";
import { Error } from "../Error/index";

import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";
import { CREATE_TODO } from "../../graphql/mutation/CREATE_TODO";
import { SWITCH_SELECTED_PRODUCT } from "../../graphql/mutation/Local/SWITCH_SELECTED_PRODUCT";
import { GET_STATUS } from "../../graphql/queries/Local/GET_STATUS";

const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: ${props => props.theme.addTodo.bgColor};
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  color: ${props => props.theme.addTodo.textColor};
  background: transparent;
  border: 0;
  width: 100%;
  font-size: 1.6rem;
`;

const IconContainer = styled.div`
  color: ${props => props.theme.addTodo.textColor};
  padding-left: 1rem;
  padding-right: 1rem;
`;

class CreateTodoContainer extends React.Component {
  state = { input: "" };

  _onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  _onKeyPress = (e, mutate) => {
    if (e.key === "Enter") {
      mutate({
        variables: { body: this.state.input }
      });
      this._clearInput();
    }
  };

  _clearInput = () => {
    this.setState({ input: "" });
  };

  render() {
    const { input } = this.state;
    const { id, theme } = this.props;

    return (
      <InputBox>
        <IconContainer>
          <Icon icon={pencil2} size={16} />
        </IconContainer>
        <Query query={GET_STATUS}>
          {({ data: { status }, loading, error }) => {
            if (loading)
              return (
                <Loading
                  type="spinningBubbles"
                  color={theme.loading.color}
                  width={100}
                  height={100}
                />
              );
            if (error) return <Error err={error} />;
            return (
              <Mutation
                mutation={CREATE_TODO}
                refetchQueries={[
                  {
                    query: GET_TODOS_BY_PRODUCT,
                    variables: {
                      id,
                      completed: status === "DONE"
                    }
                  }
                ]}
              >
                {mutate => (
                  <Input
                    placeholder="Add Todo..."
                    value={input}
                    onChange={this._onInputChange}
                    onKeyPress={e => this._onKeyPress(e, mutate)}
                  />
                )}
              </Mutation>
            );
          }}
        </Query>
        {input !== "" && (
          <IconContainer onClick={this._clearInput}>
            <Icon icon={cross} size={8} />
          </IconContainer>
        )}
      </InputBox>
    );
  }
}

export const CreateTodo = withTheme(CreateTodoContainer);
