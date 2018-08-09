import React from "react";
import styled from "react-emotion";

import { Products } from "../Products/index";
import { Logo } from "../Logo/index";

const Container = styled.aside`
  position: fixed;
  top: 10rem;
  bottom: 0;
  overflow-y: scroll;
  background: ${props => props.theme.sidebar.bgColor};
  width: ${props => props.theme.sidebar.width};
`;

export const Sidebar = ({ products }) => (
  <Container>
    <Logo />
    <Products products={products} />
  </Container>
);
