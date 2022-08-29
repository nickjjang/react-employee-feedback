import { Formik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { useEffect, useState } from "react";

// @ts-ignore
import Grid from "styled-components-grid";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import AdminDashboardLayout from "../../../layouts/Admin/Dashboard";
import employeesApi from "../../../services/employees/employees.api";
import { IEmployee } from "../../../services/types";

const Paragraph = styled.div`
  margin: 6px 0;
`;

const FormField = styled.div`
  margin-bottom: 2px;
`;

const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name field is required."),
  lastName: Yup.string().required("Last name field is required."),
});

const AdminEmployees = () => {
  const initValues: IEmployee = { firstName: "", lastName: "" };
  const [edited, setEdited] = useState<IEmployee | null>(null);

  const { data: employees, refetch: refetchEmployees } =
    employeesApi.useGetEmployeesQuery({});
  const [deleteEmployee] = employeesApi.useDeleteEmployeeMutation();
  const [addEmployee] = employeesApi.useAddEmployeeMutation();
  const [updateEmployee] = employeesApi.useUpdateEmployeeMutation();

  const handleDelete = (id: number) => async () => {
    await deleteEmployee(id);
    refetchEmployees();
  };

  const handleAdd = async (values: IEmployee, formikBag: any) => {
    await addEmployee(values);
    formikBag.setValues(initValues);
    formikBag.setTouched({ firstName: false, lastName: false });
    refetchEmployees();
  };

  const handleGotoEdit = (employee: IEmployee) => () => {
    setEdited(employee);
  };

  const handleEditCancel = () => {
    setEdited(null);
  };

  const handleUpdate = async (values: IEmployee) => {
    await updateEmployee({ id: edited?.id, body: values });
    setEdited(null);
    refetchEmployees();
  };

  useEffect(() => {
    refetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminDashboardLayout>
      <Container>
        <Paragraph>
          <Grid style={{ borderBottom: "1px solid black" }}>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              No
            </Grid.Unit>
            <Grid.Unit size={2 / 6} style={{ padding: "2px" }}>
              Firstname
            </Grid.Unit>
            <Grid.Unit size={2 / 6} style={{ padding: "2px" }}>
              Lastname
            </Grid.Unit>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              Actions
            </Grid.Unit>
          </Grid>
          {employees && employees.length > 0 ? (
            employees.map((employee: IEmployee, index: number) =>
              edited != null && edited.id === employee.id ? (
                <Formik
                  key={employee.id}
                  initialValues={{
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                  }}
                  validationSchema={EmployeeSchema}
                  onSubmit={handleUpdate}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid style={{ borderBottom: "1px solid black" }}>
                        <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
                          {index + 1}
                        </Grid.Unit>
                        <Grid.Unit size={2 / 6} style={{ padding: "2px" }}>
                          <FormField>
                            <Input
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                            />
                          </FormField>
                          <Label
                            error={!!touched.firstName && !!errors.firstName}
                          >
                            {errors.firstName}
                          </Label>
                        </Grid.Unit>
                        <Grid.Unit size={2 / 6} style={{ padding: "2px" }}>
                          <FormField>
                            <Input
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                            />
                          </FormField>
                          <Label
                            error={!!touched.lastName && !!errors.lastName}
                          >
                            {errors.lastName}
                          </Label>
                        </Grid.Unit>
                        <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
                          <Button type="submit" disabled={isSubmitting}>
                            Update
                          </Button>
                          &nbsp;
                          <Button type="button" onClick={handleEditCancel}>
                            Cancel
                          </Button>
                        </Grid.Unit>
                      </Grid>
                    </form>
                  )}
                </Formik>
              ) : (
                <Grid
                  key={employee.id}
                  style={{ borderBottom: "1px solid black" }}
                >
                  <Grid.Unit size={1 / 6} style={{ padding: "4px" }}>
                    {index + 1}
                  </Grid.Unit>
                  <Grid.Unit size={2 / 6} style={{ padding: "4px" }}>
                    {employee.firstName}
                  </Grid.Unit>
                  <Grid.Unit size={2 / 6} style={{ padding: "4px" }}>
                    {employee.lastName}
                  </Grid.Unit>
                  <Grid.Unit size={1 / 6} style={{ padding: "4px" }}>
                    <Button type="button" onClick={handleGotoEdit(employee)}>
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      onClick={handleDelete(employee.id as number)}
                    >
                      Delete
                    </Button>
                  </Grid.Unit>
                </Grid>
              )
            )
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
        <Formik
          initialValues={initValues}
          validationSchema={EmployeeSchema}
          onSubmit={handleAdd}
        >
          {({
            errors,
            touched,
            values,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Unit size={1 / 6}>*</Grid.Unit>
                <Grid.Unit size={2 / 6}>
                  <FormField>
                    <Input
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </FormField>
                  <Label error={!!touched.firstName && !!errors.firstName}>
                    {errors.firstName}
                  </Label>
                </Grid.Unit>
                <Grid.Unit size={2 / 6}>
                  <FormField>
                    <Input
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </FormField>
                  <Label error={!!touched.lastName && !!errors.lastName}>
                    {errors.lastName}
                  </Label>
                </Grid.Unit>
                <Grid.Unit size={1 / 6}>
                  <Button type="submit" disabled={isSubmitting}>
                    Add
                  </Button>
                </Grid.Unit>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </AdminDashboardLayout>
  );
};

export default AdminEmployees;
