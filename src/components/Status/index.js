import React from "react";
import styled from "react-emotion";
import { Mutation } from "react-apollo";

import { Query } from "../Query";

import { GET_STATUS } from "../../graphql/queries/Local/GET_STATUS";
import { SWITCH_STATUS } from "../../graphql/mutation/Local/SWITCH_STATUS";

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
      <Mutation mutation={SWITCH_STATUS}>
        {switchStatus => (
          <Wrapper>
            <Btn onClick={switchStatus} highlight={status === "DONE"}>
              Done
            </Btn>
            <Btn onClick={switchStatus} highlight={status === "PENDING"}>
              Pending
            </Btn>
          </Wrapper>
        )}
      </Mutation>
    )}
  </Query>
);
