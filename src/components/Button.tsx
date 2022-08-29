import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  border: 1px solid black;
  line-height: 24px;
  padding: 4px 16px;
  border-radius: 5px;
  background-color: #000000;
  color: white;
  font-size: 16px;
  &:hover {
    background-color: #333333;
  }
  &:active {
    background-color: #444444;
  }
  &:disabled {
    background-color: #888888;
  }
`;

export default Button;
