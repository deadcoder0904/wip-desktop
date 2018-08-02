// https://github.com/styled-components/styled-components/issues/793#issuecomment-356559057

import React from "react";
import { injectGlobal } from "react-emotion";
import { withTheme } from "emotion-theming";

class Global extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.theme.bgColor !== prevProps.theme.bgColor) {
      window.document.body.style.backgroundColor = this.props.theme.bgColor;
    }
    if (this.props.theme.textColor !== prevProps.theme.textColor) {
      window.document.body.style.color = this.props.theme.textColor;
    }
  }

  render() {
    injectGlobal`
			:not(input):not(textarea),
			:not(input):not(textarea)::after,
			:not(input):not(textarea)::before {
					user-select: none;
					cursor: default;
			}

			::placeholder {
				color: #ccc;
			}
			
			input, button, textarea, :focus {
					outline: none;
			}

			html{
				font-size: 62.5%;
    		line-height: 1.15;
			}

			body {
				background-color: ${this.props.theme.bgColor};
				color: ${this.props.theme.textColor};
				box-sizing: border-box;
				padding: 0px;
				margin: 0px;
				-webkit-app-region: drag;
			}
		`;
    return React.Children.only(this.props.children);
  }
}

export default withTheme(Global);
