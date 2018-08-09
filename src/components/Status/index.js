import React from "react";
import styled from "react-emotion";
import { Mutation } from "react-apollo";

import { Query } from "../Query";

import { GET_STATUS } from "../../graphql/queries/Local/GET_STATUS";
import { SET_STATUS } from "../../graphql/mutation/Local/SET_STATUS";

import { state } from "../../utils/state";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Btn = styled.button`
  color: ${props =>
    props.highlight
      ? props.theme.status.highlightColor
      : props.theme.status.textColor};
  background: ${props => props.theme.status.bgColor};
  border: none;
  padding: 1rem;
  margin: 0.5rem;
  flex: 1;
  font-size: 1.4rem;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 300;
  &:focus {
    outline: none;
  }
`;

export const Status = () => (
  <Query query={GET_STATUS}>
    {({ data: { status } }) => (
      <Mutation mutation={SET_STATUS}>
        {setStatus => (
          <Wrapper>
            <Btn
              onClick={() => {
                const status = "PENDING";
                setStatus({ variables: { status } });
                state.set({
                  status
                });
              }}
              highlight={status === "PENDING"}
            >
              Pending
            </Btn>
            <Btn
              onClick={() => {
                const status = "DONE";
                setStatus({ variables: { status } });
                state.set({
                  status
                });
              }}
              highlight={status === "DONE"}
            >
              Done
            </Btn>
          </Wrapper>
        )}
      </Mutation>
    )}
  </Query>
);
