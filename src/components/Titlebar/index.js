import React from "react";
import styled, { css } from "react-emotion";
import { callMain, answerMain } from "electron-better-ipc";
import { Mutation } from "react-apollo";

import {
  Close,
  ClosePressed,
  Minimize,
  MinimizePressed,
  Maximize,
  MaximizePressed,
  Unfocused
} from "./WindowButtons/index";
import { Moon } from "./Moon";
import { Logo } from "../Logo/index";

import construction from "../../static/construction.svg";

const Container = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  background: ${props => props.theme.titlebar.bgColor};
  width: 100%;
  height: ${props => props.theme.titlebar.height};
  -webkit-app-region: drag;
`;

const ButtonStyle = css`
  -webkit-app-region: no-drag;
  margin: 0.2rem;
  z-index: 1;
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
        <Moon />
      </Container>
    );
  }
}
