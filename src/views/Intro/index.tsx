import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/Container";
import IntroLayout from "../../layouts/Intro";
// @ts-ignore

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Card = styled.div`
  margin: 20px;
  width: 200px;
  padding: 30px 10px;
  cursor: pointer;
  border: 2px solid #4566ff;
  color: black;
  font-size: 24px;
  text-align: center;
  border-radius: 4px;
  &:hover {
    background-color: #4566ee;
    color: white;
  }
`;

const Intro = () => {
  let navigate = useNavigate();

  const navigatePath = (path: string) => () => {
    navigate(path);
  };

  return (
    <IntroLayout>
      <Container>
        <Wrapper>
          <Card onClick={navigatePath("/admin/employees")}>Admin</Card>
          <Card onClick={navigatePath("/employees")}>Employee</Card>
        </Wrapper>
      </Container>
    </IntroLayout>
  );
};

export default Intro;
