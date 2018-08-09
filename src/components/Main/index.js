import React from "react";
import styled from "react-emotion";
import reactStringReplace from "react-string-replace";
import { v4 } from "uuid";
import { Mutation, ApolloConsumer } from "react-apollo";
import { Icon } from "react-icons-kit";
import { pencil2 } from "react-icons-kit/icomoon/pencil2";
import { cross } from "react-icons-kit/icomoon/cross";
import { checkmark2 } from "react-icons-kit/icomoon/checkmark2";

import { Query } from "../Query";
import { Loading } from "../Loading/index";
import { Status } from "../Status/index";

import { CREATE_TODO } from "../../graphql/mutation/CREATE_TODO";
import { GET_TODOS_BY_PRODUCT } from "../../graphql/queries/GET_TODOS_BY_PRODUCT";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/Local/GET_SELECTED_PRODUCT";
import { SWITCH_SELECTED_PRODUCT } from "../../graphql/mutation/Local/SWITCH_SELECTED_PRODUCT";
import { GET_STATUS } from "../../graphql/queries/Local/GET_STATUS";

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

export class Main extends React.Component {
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

  _getHashtag = (body, hashtag) => {
    return reactStringReplace(body, `#${hashtag}`, (match, i) => (
      <Hashtag key={v4()}>{match}</Hashtag>
    ));
  };

  render() {
    const { input } = this.state;
    const { id } = this.props;
    return (
      <Query query={GET_SELECTED_PRODUCT}>
        {({ data: { selectedProduct } }) => {
          return (
            <Query
              query={GET_TODOS_BY_PRODUCT}
              variables={{ id: !selectedProduct ? id : selectedProduct.id }}
            >
              {({ data: { product } }) => {
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
                      <InputBox>
                        <IconContainer>
                          <Icon icon={pencil2} size={16} />
                        </IconContainer>
                        <Query query={GET_STATUS}>
                          {({ data: { status } }) => (
                            <Mutation
                              mutation={CREATE_TODO}
                              refetchQueries={[
                                {
                                  query: GET_TODOS_BY_PRODUCT,
                                  variables: {
                                    id: !selectedProduct
                                      ? id
                                      : selectedProduct.id,
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
                          )}
                        </Query>
                        {input !== "" && (
                          <IconContainer onClick={this._clearInput}>
                            <Icon icon={cross} size={8} />
                          </IconContainer>
                        )}
                      </InputBox>
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
