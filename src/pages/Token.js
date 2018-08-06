import React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { navigate, Redirect } from "@reach/router";
import styled from "react-emotion";

import { state } from "../utils/state";

import Loading from "../components/Loading";

import { CREATE_TODO } from "../graphql/mutation/CREATE_TODO";
import { DELETE_TODO } from "../graphql/mutation/DELETE_TODO";
import { GET_USER } from "../graphql/queries/GET_USER";

import tokenArt from "../static/token.svg";

const Container = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: calc(100vh - ${props => props.theme.titleBarHeight});
`;

const Img = styled.img`
  width: 512px;
  height: 420px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #999;
  padding: 0.5rem;
  font-size: 2rem;
  color: #333;
  width: 30rem;
  text-align: center;
`;

const Button = styled.button`
  color: white;
  background-color: #123456;
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 0.5rem;
  font-size: 2rem;
  width: 25rem;
`;

const Error = styled.div`
  color: red;
  font-size: 2rem;
`;

export class Token extends React.Component {
  state = {
    token: "",
    loading: false,
    error: false
  };

  _onTokenChange = e => {
    this.setState({ token: e.target.value });
  };

  _onSave = async client => {
    const { token } = this.state;
    if (token === "") {
      this.setState({
        error: "Please enter your token found at https://wip.chat/api"
      });
      return;
    }
    state.set({ token });
    this.setState({ error: false, loading: true });
    const body =
      "This todo will be automatically added & removed by WIP Desktop";

    try {
      const { data } = await client.mutate({
        mutation: CREATE_TODO,
        variables: { body }
      });
      if (data.createTodo.body === body) {
        await client.mutate({
          mutation: DELETE_TODO,
          variables: { id: data.createTodo.id }
        });
        const user = await client.query({
          query: GET_USER
        });
        state.set({ loggedIn: true, user: user.data.viewer });
        navigate("/home");
      }
    } catch (error) {
      this.setState({
        error: "Invalid Token. Please find your token at https://wip.chat/api",
        loading: false
      });
    }
  };

  render() {
    if (state.get("loggedIn")) return <Redirect to="/home" noThrow />;
    const { token, loading, error } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <Container>
            <Img src={tokenArt} />
            <Wrapper>
              <Input
                type="text"
                placeholder="Enter your Token"
                value={token}
                onChange={this._onTokenChange}
              />
              <Button onClick={() => this._onSave(client)}>Save Token</Button>
              {loading && <Loading type="bars" />}
              {error && <Error>{error}</Error>}
            </Wrapper>
          </Container>
        )}
      </ApolloConsumer>
    );
  }
}
