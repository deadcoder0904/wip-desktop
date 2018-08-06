import React from "react";
import styled from "react-emotion";
import construction from "../static/construction.svg";

const Bg = styled.div`
  position: fixed;
  top: ${props => props.theme.titleBarHeight};
  z-index: 1;
  background: ${props => props.theme.sideBarBg};
  width: ${props => props.theme.sideBarWidth};
  height: 8rem;
`;

const Container = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  left: 2rem;
`;

const Img = styled.img`
  width: 5rem;
  height: 5rem;
  padding-right: 0.5rem;
`;

const Header = styled.h1`
  font-weight: 300;
  font-size: 3rem;
  font-family: ${props => props.theme.fontFamily};
`;

export const Logo = () => (
  <Bg>
    <Container>
      <Img src={construction} />
      <Header>WIP</Header>
    </Container>
  </Bg>
);
