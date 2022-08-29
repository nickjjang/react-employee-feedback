import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../app/store";
import Container from "../components/Container";

const Header = styled.div`
  background-color: #222;
  padding: 20px 0;
  color: white;
`;

const Nav = styled.div`
  display: flex;
  a {
    color: white;
    padding: 10px 10px;
  }
`;
const Main = styled.div``;

const EmployeeLayout = ({ children }: { children: ReactNode }) => {
  const employee = useSelector((state: RootState) => state.employees.employee);
  return (
    <>
      <Header>
        <Container>
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/employees">Employees</NavLink>
            {employee && (
              <NavLink to={`/employees/${employee.id}`}>
                Selected: {employee.firstName} {employee.lastName}
              </NavLink>
            )}
          </Nav>
        </Container>
      </Header>
      <Main>{children}</Main>
    </>
  );
};

export default EmployeeLayout;
