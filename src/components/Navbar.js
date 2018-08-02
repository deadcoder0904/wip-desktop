import React from "react";
import styled from "react-emotion";
import { callMain } from "electron-better-ipc";

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

const Container = styled.div`
  background: ${props => props.theme.navBarColor};
  height: ${props => props.theme.titleBarHeight};
`;

export class Navbar extends React.Component {
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
          onClick={() => this._pressWindowIcons("app-quit")}
          onMouseEnter={this._toggleIcons}
          onMouseLeave={this._toggleIcons}
        />
        <MinimizeButton
          onClick={() => this._pressWindowIcons("app-minimize")}
          onMouseEnter={this._toggleIcons}
          onMouseLeave={this._toggleIcons}
        />
        <MaximizeButton
          onClick={() => this._pressWindowIcons("app-maximize")}
          onMouseEnter={this._toggleIcons}
          onMouseLeave={this._toggleIcons}
        />
      </Container>
    );
  }
}
