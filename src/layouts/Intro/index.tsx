import { ReactNode } from "react";
import styled from "styled-components";
const Main = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IntroLayout = ({ children }: { children: ReactNode }) => {
  return <Main>{children}</Main>;
};

export default IntroLayout;
