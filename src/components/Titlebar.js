import React from "react";
import styled, { css } from "react-emotion";
import { callMain, answerMain } from "electron-better-ipc";

import construction from "../static/construction.svg";

import {
  Close,
  ClosePressed,
  Minimize,
  MinimizePressed,
  Maximize,
  MaximizePressed,
  Unfocused
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
  z-index: 1;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0.5rem;
  position: absolute;
  width: 100%;
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
  state = { iconsHovered: false, isFullScreen: false };

  componentDidMount() {
    answerMain("window-blur", isBlur => {
      this.setState(prevState => ({
        isBlur: !prevState.isBlur
      }));
    });
  }

  _toggleIcons = () => {
    this.setState(prevState => ({ iconsHovered: !prevState.iconsHovered }));
  };

  _pressWindowIcons = async action => {
    if (action === "app-maximize")
      this.setState({ isFullScreen: !this.state.isFullScreen });
    await callMain(action);
  };

  render() {
    const { iconsHovered, isFullScreen, isBlur } = this.state;
    let CloseButton, MinimizeButton, MaximizeButton;
    if (iconsHovered) {
      CloseButton = ClosePressed;
      MinimizeButton = MinimizePressed;
      MaximizeButton = MaximizePressed;
    } else {
      CloseButton = Close;
      MinimizeButton = Minimize;
      MaximizeButton = Maximize;
    }
    if (isFullScreen) MinimizeButton = Unfocused;
    if (isBlur) {
      CloseButton = Unfocused;
      MinimizeButton = Unfocused;
      MaximizeButton = Unfocused;
    }
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
