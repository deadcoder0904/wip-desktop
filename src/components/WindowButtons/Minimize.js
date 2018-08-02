import React from "react";

export const MinimizePressed = props => (
  <svg height={24} width={24} {...props}>
    <g fillRule="evenodd">
      <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14" fill="#da9e10" />
      <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13" fill="#fac536" />
      <path
        d="M7.853 11.409h8.294c.321 0 .584.262.584.583v.016a.585.585 0 0 1-.584.583H7.853a.585.585 0 0 1-.584-.583v-.016c0-.32.263-.583.584-.583"
        fill="#975914"
      />
    </g>
  </svg>
);

export const MinimizeUnFocused = props => (
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

export const Minimize = props => (
  <svg height={24} width={24} {...props}>
    <g fillRule="evenodd">
      <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14" fill="#da9e10" />
      <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13" fill="#fac536" />
    </g>
  </svg>
);