import { ReactNode } from "react";
import styled, { css } from "styled-components";

const Main = styled.div`
  margin: auto;
  padding: 0 16px;
  max-width: 100%;
`;

const MediaMain = styled(Main)`
  ${(props) => {
    return css`
      @media screen and (min-width: ${props.theme.screen.sm}px) {
        width: ${props.theme.container.sm}px;
      }
      @media screen and (min-width: ${props.theme.screen.md}px) {
        width: ${props.theme.container.md}px;
      }
      @media screen and (min-width: ${props.theme.screen.lg}px) {
        width: ${props.theme.container.lg}px;
      }
      @media screen and (min-width: ${props.theme.screen.xl}px) {
        width: ${props.theme.container.xl}px;
      }
    `;
  }}
`;

const Container = ({ children = null }: { children?: ReactNode }) => {
  return <MediaMain>{children}</MediaMain>;
};

export default Container;
