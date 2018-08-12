import React from "react";
import styled from "react-emotion";
import ReactLoading from "react-loading";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const Loading = ({
  type = "spinningBubbles",
  color = "#000",
  width = 50,
  height = 50,
}) => (
  <Container>
    <ReactLoading type={type} color={color} width={width} height={height} />
  </Container>
);
