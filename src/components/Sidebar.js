import React from "react";
import styled from "react-emotion";

import { Products } from "./Products";
import { Logo } from "./Logo";

const Container = styled.aside`
  position: fixed;
  top: 10rem;
  bottom: 0;
  overflow-y: scroll;
  background: ${props => props.theme.sideBarBg};
  width: ${props => props.theme.sideBarWidth};
`;

export const Sidebar = ({ products }) => (
  <Container>
    <Logo />
    <Products products={products} />
  </Container>
);
