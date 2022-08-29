import { Formik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";

import { useParams } from "react-router-dom";
// @ts-ignore
import Grid from "styled-components-grid";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Label from "../../components/Label";
import EmployeeLayout from "../../layouts/Employee";
import homeApi from "../../services/home/home.api";
import { IFeedback } from "../../services/types";

const Paragraph = styled.div`
  margin: 6px 0;
`;

const FormField = styled.div`
  margin-bottom: 2px;
`;

const FeedbackSchema = Yup.object().shape({
  content: Yup.string().required("Content field is required."),
});

const Feedbacks = () => {
  const { id } = useParams();
  const { data: feedbacks, refetch } = homeApi.useGetFeedbacksQuery(id);
  const [submitFeedback] = homeApi.useSubmitFeedbackMutation();

  const handleUpdate = (id: number) => async (values: IFeedback) => {
    await submitFeedback({ id, body: values });
    refetch();
  };

  return (
    <EmployeeLayout>
      <Container>
        <Paragraph>
          <Grid style={{ borderBottom: "1px solid black" }}>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              No
            </Grid.Unit>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              Review
            </Grid.Unit>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              Receiver
            </Grid.Unit>
            <Grid.Unit size={2 / 6} style={{ padding: "2px" }}>
              Feedback
            </Grid.Unit>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              Actions
            </Grid.Unit>
          </Grid>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback: IFeedback, index: number) => (
              <Formik
                key={feedback.id}
                initialValues={{
                  content: feedback.content,
                }}
                validationSchema={FeedbackSchema}
                onSubmit={handleUpdate(feedback.id as number)}
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
                      <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
                        {feedback.review?.name}
                      </Grid.Unit>
                      <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
                        {feedback.receiver?.firstName}{" "}
                        {feedback.receiver?.lastName}
                      </Grid.Unit>
                      <Grid.Unit size={2 / 6} style={{ padding: "2px" }}>
                        <FormField>
                          <Input
                            name="content"
                            style={{ width: "90%" }}
                            value={values.content}
                            onChange={handleChange}
                          />
                        </FormField>
                        <Label error={!!touched.content && !!errors.content}>
                          {errors.content}
                        </Label>
                      </Grid.Unit>
                      <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
                        <Button type="submit" disabled={isSubmitting}>
                          Submit
                        </Button>
                      </Grid.Unit>
                    </Grid>
                  </form>
                )}
              </Formik>
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

export default Feedbacks;
