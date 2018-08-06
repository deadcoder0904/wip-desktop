import React from "react";
import styled, { css } from "react-emotion";
import { callMain } from "electron-better-ipc";

import construction from "../static/construction.svg";

import {
  Close,
  ClosePressed,
  CloseUnFocused,
  Minimize,
  MinimizePressed,
  MinimizeUnFocused,
  Maximize,
  MaximizePressed,
  MaximizeUnFocused
} from "../components/WindowButtons/index";
import { Logo } from "../components/Logo";

const Container = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  background: ${props => props.theme.navBarColor};
  width: 100%;
  height: ${props => props.theme.titleBarHeight};
`;

const ButtonStyle = css`
  margin: 0.2rem;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

const Img = styled.img`
  width: 2rem;
  height: 2rem;
  padding-right: 0.5rem;
`;

const Header = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 1.6rem;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 300;
`;

export class Titlebar extends React.Component {
  state = { iconsHovered: false };

  _toggleIcons = () => {
    this.setState(prevState => ({ iconsHovered: !prevState.iconsHovered }));
  };

  _pressWindowIcons = async action => {
    await callMain(action);
  };

  render() {
    const { iconsHovered } = this.state;
    const CloseButton = iconsHovered ? ClosePressed : Close;
    const MinimizeButton = iconsHovered ? MinimizePressed : Minimize;
    const MaximizeButton = iconsHovered ? MaximizePressed : Maximize;
    return (
      <Container>
        <CloseButton
          className={css`
            ${ButtonStyle};
          `}
          width={20}
          height={20}
          onClick={() => this._pressWindowIcons("app-quit")}
          onMouseEnter={this._toggleIcons}
          onMouseLeave={this._toggleIcons}
        />
        <MinimizeButton
          className={css`
            ${ButtonStyle};
          `}
          width={20}
          height={20}
          onClick={() => this._pressWindowIcons("app-minimize")}
          onMouseEnter={this._toggleIcons}
          onMouseLeave={this._toggleIcons}
        />
        <MaximizeButton
          className={css`
            ${ButtonStyle};
          `}
          width={20}
          height={20}
          onClick={() => this._pressWindowIcons("app-maximize")}
          onMouseEnter={this._toggleIcons}
          onMouseLeave={this._toggleIcons}
        />
        <Wrapper>
          <Img src={construction} />
          <Header>WIP</Header>
        </Wrapper>
      </Container>
    );
  }
}
