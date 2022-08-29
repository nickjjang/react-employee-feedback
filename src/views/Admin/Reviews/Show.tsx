import { Formik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// @ts-ignore
import Grid from "styled-components-grid";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import Select from "../../../components/Select";
import AdminDashboardLayout from "../../../layouts/Admin/Dashboard";
import employeesApi from "../../../services/employees/employees.api";
import reviewsApi from "../../../services/reviews/reviews.api";
import { IEmployee, IFeedback, ISelect } from "../../../services/types";

const Paragraph = styled.div`
  margin: 6px 0;
`;

const FormField = styled.div`
  margin-bottom: 2px;
`;

const FeedbackSchema = Yup.object().shape({
  giverId: Yup.string().required("Giver field is required."),
  receiverId: Yup.string()
    .required("Receiver field is required.")
    .test(
      "notEqual",
      "Giver and receiver should not be same",
      function (value) {
        const { giverId } = this.parent;
        // eslint-disable-next-line eqeqeq
        return value != giverId;
      }
    ),
});

const AdminReview = () => {
  const initValues: IFeedback = { giverId: "", receiverId: "" };
  const { data: employees } = employeesApi.useGetEmployeesQuery({});
  const [employeesList, setEmployeesList] = useState<ISelect[]>([]);
  const { id } = useParams();
  const { data: review, refetch: refetchReview } =
    reviewsApi.useGetReviewQuery(id);
  const [assignFeedback] = reviewsApi.useAssignFeedbackMutation();

  const handleAssignFeedback = async (values: IFeedback, formikBag: any) => {
    await assignFeedback({
      giverId: parseInt(values.giverId as unknown as string, 0) + 0,
      receiverId: parseInt(values.receiverId as unknown as string, 0) + 0,
      reviewId: parseInt(id as string),
    });
    formikBag.setValues(initValues);
    formikBag.setTouched({ giverId: false, receiverId: false });
    refetchReview();
  };

  useEffect(() => {
    let list: ISelect[] = [];
    if (employees && employees.length > 0) {
      list = [
        { key: "", value: "" },
        ...employees.map((employee: IEmployee) => ({
          key: employee.id,
          value: `${employee.firstName} ${employee.lastName}`,
        })),
      ];
    }
    setEmployeesList(list);
  }, [employees]);

  useEffect(() => {
    refetchReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminDashboardLayout>
      <Container>
        <Paragraph>
          {review && (
            <>
              <Paragraph>
                <b>Performance Review: {review.name}</b>
              </Paragraph>
              <Paragraph>
                <b>Feedbacks</b>
              </Paragraph>
              <Grid style={{ borderBottom: "1px solid black" }}>
                <Grid.Unit
                  size={1 / 6}
                  style={{ padding: "2px", textAlign: "center" }}
                >
                  No
                </Grid.Unit>
                <Grid.Unit
                  size={1 / 6}
                  style={{ padding: "2px", textAlign: "center" }}
                >
                  Giver
                </Grid.Unit>
                <Grid.Unit
                  size={1 / 6}
                  style={{ padding: "2px", textAlign: "center" }}
                >
                  Receiver
                </Grid.Unit>
                <Grid.Unit
                  size={3 / 6}
                  style={{ padding: "2px", textAlign: "center" }}
                >
                  Feedback
                </Grid.Unit>
              </Grid>
              {review.feedbacks && review.feedbacks.length > 0 ? (
                review.feedbacks.map((feedback: IFeedback, index: number) => {
                  const giver =
                    employees && employees.length > 0
                      ? employees.find(
                          (employee: IEmployee) =>
                            employee.id === feedback.giverId
                        )
                      : null;
                  const receiver =
                    employees && employees.length > 0
                      ? employees.find(
                          (employee: IEmployee) =>
                            employee.id === feedback.receiverId
                        )
                      : null;
                  return (
                    <Grid
                      key={feedback.id}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      <Grid.Unit
                        size={1 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        {index + 1}
                      </Grid.Unit>
                      <Grid.Unit
                        size={1 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        {giver && `${giver.firstName} ${giver.lastName}`}
                      </Grid.Unit>
                      <Grid.Unit
                        size={1 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        {receiver &&
                          `${receiver.firstName} ${receiver.lastName}`}
                      </Grid.Unit>
                      <Grid.Unit
                        size={2 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        {feedback.content}
                      </Grid.Unit>
                      <Grid.Unit
                        size={1 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        {feedback.completed ? "Filled" : "Requested"}
                      </Grid.Unit>
                    </Grid>
                  );
                })
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
              <Formik
                initialValues={initValues}
                validationSchema={FeedbackSchema}
                onSubmit={handleAssignFeedback}
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
                      <Grid.Unit
                        size={1 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        *
                      </Grid.Unit>
                      <Grid.Unit
                        size={1 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        <FormField>
                          <Select
                            name="giverId"
                            list={employeesList}
                            value={values.giverId}
                            onChange={handleChange}
                          />
                        </FormField>
                        <Label error={!!touched.giverId && !!errors.giverId}>
                          {errors.giverId}
                        </Label>
                      </Grid.Unit>
                      <Grid.Unit
                        size={1 / 6}
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        <FormField>
                          <Select
                            name="receiverId"
                            list={employeesList}
                            value={values.receiverId}
                            onChange={handleChange}
                          />
                        </FormField>
                        <Label
                          error={!!touched.receiverId && !!errors.receiverId}
                        >
                          {errors.receiverId}
                        </Label>
                      </Grid.Unit>
                      <Grid.Unit
                        size={3 / 6}
                        style={{ padding: "4px", textAlign: "right" }}
                      >
                        <Button type="submit" disabled={isSubmitting}>
                          Request
                        </Button>
                      </Grid.Unit>
                    </Grid>
                  </form>
                )}
              </Formik>
            </>
          )}
        </Paragraph>
      </Container>
    </AdminDashboardLayout>
  );
};

export default AdminReview;
