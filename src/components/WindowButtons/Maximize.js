import React from "react";

export const MaximizePressed = props => (
  <svg height={24} width={24} {...props}>
    <g fillRule="evenodd">
      <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14" fill="#13c11e" />
      <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13" fill="#39ea49" />
      <path
        d="M10.078 8.375h4.441c.591 0 1.075.484 1.075 1.075v4.441zm3.861 7.25H9.481a1.078 1.078 0 0 1-1.075-1.075V10.09z"
        fill="#0b7407"
      />
    </g>
  </svg>
);

export const MaximizeUnFocused = props => (
  <svg height={24} width={24} {...props}>
    <g fillRule="evenodd">
      <path
        d="M12.273 18.727a6.727 6.727 0 1 0 0-13.454 6.727 6.727 0 0 0 0 13.454"
        fill="#4d4d4d"
      />
      <path
        d="M12.273 18.155a6.155 6.155 0 1 0 0-12.31 6.155 6.155 0 0 0 0 12.31"
        fill="#666"
      />
    </g>
  </svg>
);

export const Maximize = props => (
  <svg height={24} width={24} {...props}>
    <g fillRule="evenodd">
      <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14" fill="#13c11e" />
      <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13" fill="#39ea49" />
    </g>
  </svg>
);
