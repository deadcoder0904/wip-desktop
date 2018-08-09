import React from "react";
import ReactLoading from "react-loading";

export const Loading = ({
  type = "spinningBubbles",
  color = "#000",
  width = 50,
  height = 50
}) => <ReactLoading type={type} color={color} width={width} height={height} />;
