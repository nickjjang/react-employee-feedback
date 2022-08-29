/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// @ts-ignore
import Grid from "styled-components-grid";
import { useAppDispatch } from "../../app/hooks";
import Container from "../../components/Container";
import EmployeeLayout from "../../layouts/Employee";
import { employeesSlice } from "../../services/employees/employees.slice";
import homeApi from "../../services/home/home.api";
import { IEmployee } from "../../services/types";

const Paragraph = styled.div`
  margin: 6px 0;
`;

const Employees = () => {
  const { data: employees } = homeApi.useGetEmployeesQuery({});

  const dispatch = useAppDispatch();

  const handleNavigate = (employee: IEmployee) => () => {
    dispatch(employeesSlice.actions.setEmployee(employee));
  };

  return (
    <EmployeeLayout>
      <Container>
        <Paragraph>
          <Grid style={{ borderBottom: "1px solid black" }}>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              No
            </Grid.Unit>
            <Grid.Unit size={5 / 6} style={{ padding: "2px" }}>
              Employee
            </Grid.Unit>
          </Grid>
          {employees && employees.length > 0 ? (
            employees.map((employee: IEmployee, index: number) => (
              <Grid
                key={employee.id}
                style={{ borderBottom: "1px solid black" }}
              >
                <Grid.Unit size={1 / 6} style={{ padding: "4px" }}>
                  {index + 1}
                </Grid.Unit>
                <Grid.Unit size={5 / 6} style={{ padding: "4px" }}>
                  <NavLink
                    to={`/employees/${employee.id}`}
                    onClick={handleNavigate(employee)}
                  >
                    {employee.firstName} {employee.lastName}
                  </NavLink>
                </Grid.Unit>
              </Grid>
            ))
          ) : (
            <Grid style={{ borderBottom: "1px solid black" }}>
              <Grid.Unit
                size={1}
                style={{ padding: "4px", textAlign: "center" }}
              >
                No Result
              </Grid.Unit>
            </Grid>
          )}
        </Paragraph>
      </Container>
    </EmployeeLayout>
  );
};

export default Employees;
