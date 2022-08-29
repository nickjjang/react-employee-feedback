import { Formik } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";

import { NavLink } from "react-router-dom";
// @ts-ignore
import Grid from "styled-components-grid";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import AdminDashboardLayout from "../../../layouts/Admin/Dashboard";
import reviewsApi from "../../../services/reviews/reviews.api";
import { IReview } from "../../../services/types";

const Paragraph = styled.div`
  margin: 6px 0;
`;

const FormField = styled.div`
  margin-bottom: 2px;
`;

const ReviewSchema = Yup.object().shape({
  name: Yup.string().required("Review field is required."),
});

const AdminReviews = () => {
  const initValues: IReview = { name: "" };
  const [edited, setEdited] = useState<IReview | null>(null);

  const { data: reviews, refetch: refetchReviews } =
    reviewsApi.useGetReviewsQuery({});
  const [addReview] = reviewsApi.useAddReviewMutation();
  const [updateReview] = reviewsApi.useUpdateReviewMutation();

  const handleAdd = async (values: IReview, formikBag: any) => {
    await addReview(values);
    formikBag.setValues(initValues);
    formikBag.setTouched({ firstName: false, lastName: false });
    refetchReviews();
  };

  const handleGotoEdit = (review: IReview) => () => {
    setEdited(review);
  };

  const handleEditCancel = () => {
    setEdited(null);
  };

  const handleUpdate = async (values: IReview) => {
    await updateReview({ id: edited?.id, body: values });
    setEdited(null);
    refetchReviews();
  };

  useEffect(() => {
    refetchReviews();
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
            <Grid.Unit size={4 / 6} style={{ padding: "2px" }}>
              Name
            </Grid.Unit>
            <Grid.Unit size={1 / 6} style={{ padding: "2px" }}>
              Actions
            </Grid.Unit>
          </Grid>
          {reviews && reviews.length > 0 ? (
            reviews.map((review: IReview, index: number) =>
              edited != null && edited.id === review.id ? (
                <Formik
                  key={review.id}
                  initialValues={{
                    name: review.name,
                  }}
                  validationSchema={ReviewSchema}
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
                        <Grid.Unit size={4 / 6} style={{ padding: "2px" }}>
                          <FormField>
                            <Input
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                            />
                          </FormField>
                          <Label error={!!touched.name && !!errors.name}>
                            {errors.name}
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
                  key={review.id}
                  style={{ borderBottom: "1px solid black" }}
                >
                  <Grid.Unit size={1 / 6} style={{ padding: "4px" }}>
                    {index + 1}
                  </Grid.Unit>
                  <Grid.Unit size={4 / 6} style={{ padding: "4px" }}>
                    <NavLink to={`/admin/reviews/${review.id}`}>
                      {review.name}
                    </NavLink>
                  </Grid.Unit>
                  <Grid.Unit size={1 / 6} style={{ padding: "4px" }}>
                    <Button type="button" onClick={handleGotoEdit(review)}>
                      Edit
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
          validationSchema={ReviewSchema}
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
                <Grid.Unit size={4 / 6}>
                  <FormField>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </FormField>
                  <Label error={!!touched.name && !!errors.name}>
                    {errors.name}
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

export default AdminReviews;
