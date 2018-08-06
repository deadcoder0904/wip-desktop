import React from "react";
import styled from "react-emotion";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/icomoon/search";
import { cross } from "react-icons-kit/icomoon/cross";

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem;
  margin: 1rem 1rem 1rem 2rem;
  background: #f7f7f7;
`;

const Input = styled.input`
  outline: none;
  color: #777;
  background: transparent;
  border: 0;
  width: 100%;
  font-size: 1.6rem;
`;

const IconContainer = styled.div`
  color: #b6b6b6;
  padding-left: 0.3rem;
  padding-right: 1rem;
`;

export const SearchBar = ({ input, onInputChange, clearInput }) => (
  <SearchBox>
    <IconContainer>
      <Icon icon={search} size={16} />
    </IconContainer>
    <Input
      placeholder="Search Products..."
      value={input}
      onChange={onInputChange}
    />
    {input !== "" && (
      <IconContainer onClick={clearInput}>
        <Icon icon={cross} size={8} />
      </IconContainer>
    )}
  </SearchBox>
);
