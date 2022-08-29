import styled from "styled-components";

const Label = styled.label<{
  error?: boolean;
}>`
  line-height: 24px;
  font-size: 16px;
  color: ${(props) => (props.error ? "red" : "black")};
`;

export default Label;
