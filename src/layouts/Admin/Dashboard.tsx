import { Fragment, ReactNode } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { authAdminSlice } from "../../services/authAdmin/authAdmin.slice";

const Header = styled.div`
  background-color: #222;
  padding: 20px 0;
  color: white;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    color: white;
    padding: 10px 10px;
  }
`;

const SubNav = styled.div`
  display: flex;
`;

const Main = styled.div``;
const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  const auth = useSelector((state: RootState) => state.authAdmin.authAdmin);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authAdminSlice.actions.setAuthAdmin(null));
  };

  return (
    <Fragment>
      <Header>
        <Container>
          <Nav>
            <SubNav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/admin/employees">Employees</NavLink>
              <NavLink to="/admin/reviews">Performance Reviews</NavLink>
            </SubNav>
            <SubNav>
              <Button onClick={handleLogout}>
                {auth && auth.user.firstName} Logout
              </Button>
            </SubNav>
          </Nav>
        </Container>
      </Header>
      <Main>{children}</Main>
    </Fragment>
  );
};

export default AdminDashboardLayout;
