import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as Yup from "yup";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import IntroLayout from "../../../layouts/Intro";
import authAdminApi from "../../../services/authAdmin/authAdmin.api";
import { IAdmin } from "../../../services/types";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username field is required."),
  password: Yup.string().required("Password field is required."),
});

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const Card = styled.div`
  margin: 20px;
  width: 400px;
  padding: 30px 10px;
  cursor: pointer;
  border: 2px solid #4566ff;
  color: black;
  font-size: 16px;
  border-radius: 4px;
`;

const Paragraph = styled.div`
  padding: 6px 0;
`;

const FormField = styled.div`
  margin-bottom: 2px;
`;

const AdminLogin = () => {
  const initialValues: IAdmin = { username: "", password: "" };

  const [signIn] = authAdminApi.useSignInMutation();
  const navigate = useNavigate();

  const handleLogin = async function (values: IAdmin, formikBag: any) {
    const data = await signIn(values);
    const { error } = data as any;
    if (error) {
      toast.error(error.data.message);
      return;
    }
    navigate("/admin/employees", { replace: true });
  };

  return (
    <IntroLayout>
      <Container>
        <Wrapper>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
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
                <Card>
                  <Paragraph>
                    <FormField>
                      <Label error={!!touched.username && !!errors.username}>
                        Username
                      </Label>
                    </FormField>
                    <FormField>
                      <Input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                      />
                    </FormField>
                    <FormField>
                      <Label error={!!touched.username && !!errors.username}>
                        {errors.username}
                      </Label>
                    </FormField>
                  </Paragraph>
                  <Paragraph>
                    <FormField>
                      <Label error={!!touched.password && !!errors.password}>
                        Password
                      </Label>
                    </FormField>
                    <FormField>
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </FormField>
                    <FormField>
                      <Label error={!!touched.password && !!errors.password}>
                        {errors.password}
                      </Label>
                    </FormField>
                  </Paragraph>
                  <Paragraph>
                    <Button type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Home
                    </Button>
                  </Paragraph>
                </Card>
              </form>
            )}
          </Formik>
        </Wrapper>
      </Container>
    </IntroLayout>
  );
};

export default AdminLogin;
