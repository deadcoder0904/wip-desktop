import React from "react";
import styled from "react-emotion";

const Red = styled.div`
  color: red;
  font-family: ${props => props.theme.global.fontFamily};
  font-size: 2rem;
  font-weight: 400;
`;

export const Error = err => <Red>{err}</Red>;
