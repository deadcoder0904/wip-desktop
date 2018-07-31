import React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { navigate, Redirect } from "@reach/router";

import { config } from "../config/index";

import { CREATE_TODO } from "../graphql/mutation/CreateTodo";
import { DELETE_TODO } from "../graphql/mutation/DeleteTodo";

export class Token extends React.Component {
  state = {
    token: "",
    error: undefined
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
    config.set({ token });
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
        config.set({ loggedIn: true });
        navigate("/home");
      }
    } catch (error) {
      this.setState({
        error: "Invalid Token. Please find your token at https://wip.chat/api"
      });
    }
  };

  render() {
    if (config.get("loggedIn")) return <Redirect noThrow to="/home" />;
    return (
      <ApolloConsumer>
        {client => (
          <>
            <input
              type="text"
              name="Token"
              value={this.state.token}
              onChange={this._onTokenChange}
            />
            <button onClick={() => this._onSave(client)}>Save</button>
            {this.state.error && <div>{this.state.error}</div>}
          </>
        )}
      </ApolloConsumer>
    );
  }
}
