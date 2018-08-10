import React from "react";
import { Mutation, Query } from "react-apollo";
import styled from "react-emotion";
import { withTheme } from "emotion-theming";

import { SWITCH_MODE } from "../../graphql/mutation/Local/SWITCH_MODE";
import { GET_MODE } from "../../graphql/queries/Local/GET_MODE";

import { state } from "../../utils/state";

import DARK_MOON from "../../static/dark_moon.svg";
import LIGHT_MOON from "../../static/light_moon.svg";

const Img = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  padding-top: 0.8rem;
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

const MoonContainer = ({ theme }) => (
  <Mutation mutation={SWITCH_MODE}>
    {switchMode => (
      <Query query={GET_MODE}>
        {({ data: { mode }, loading, error }) => {
          if (loading)
            return (
              <Loading
                color={theme.loading.color}
                type="bubbles"
                width={10}
                height={10}
              />
            );
          if (error) return <Error err={error} />;
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

export const Moon = withTheme(MoonContainer);
