import React from "react";
import { Close, ClosePressed } from "./Close";
import { Maximize, MaximizePressed } from "./Maximize";
import { Minimize, MinimizePressed } from "./Minimize";

const Unfocused = props => (
  <svg height={24} width={24} {...props}>
    <g fillRule="evenodd">
      <path
        d="M12.273 18.727a6.727 6.727 0 1 0 0-13.454 6.727 6.727 0 0 0 0 13.454"
        fill="#D1D1D1"
      />
      <path
        d="M12.273 18.155a6.155 6.155 0 1 0 0-12.31 6.155 6.155 0 0 0 0 12.31"
        fill="#D1D1D1"
      />
    </g>
  </svg>
);

export {
  Unfocused,
  Close,
  ClosePressed,
  Minimize,
  MinimizePressed,
  Maximize,
  MaximizePressed,
};
