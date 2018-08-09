import React from "react";
import { Mutation } from "react-apollo";
import styled from "react-emotion";

import { Query } from "../Query";

import { SWITCH_MODE } from "../../graphql/mutation/Local/SWITCH_MODE";
import { GET_MODE } from "../../graphql/queries/Local/GET_MODE";

import { state } from "../../utils/state";

import DARK_MOON from "../../static/dark_moon.svg";
import LIGHT_MOON from "../../static/light_moon.svg";

const Img = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  z-index: 1;
  position: absolute;
  right: 0.5rem;
  align-self: center;
  justify-content: center;
`;

const modeObject = {
  DARK: {
    src: LIGHT_MOON,
    alt: "Enable Light mode",
    pressed: "false"
  },
  LIGHT: {
    src: DARK_MOON,
    alt: "Enable Dark mode",
    pressed: "true"
  }
};

export const Moon = () => (
  <Mutation mutation={SWITCH_MODE}>
    {switchMode => (
      <Query query={GET_MODE}>
        {({ data: { mode } }) => {
          const { src, alt, pressed } = modeObject[mode];
          return (
            <Img
              role="button"
              aria-pressed={pressed}
              title={alt}
              onClick={() => {
                switchMode();
                state.set({ theme: mode === "LIGHT" ? "DARK" : "LIGHT" });
              }}
              src={src}
              alt={alt}
            />
          );
        }}
      </Query>
    )}
  </Mutation>
);
