import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Joi from "joi";
import withForm from "../../components/hoc/withForm";
import auth from "../../services/authService";
import {
  Form,
  FormBox,
  FormHeader,
  FormContent,
  FormButton,
  Logo,
} from "../../styles/login-styles";

const loginData = {
  email: "",
  password: "",
};

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("Email"),
  password: Joi.string().required().min(5).label("Password"),
});

const LoginForm = ({
  data,
  error,
  setError,
  renderInput,
  renderButton,
  proceedToDoSubmit,
  setProceedToDoSubmit,
  props,
}) => {
  const doSubmit = async () => {
    try {
      await auth.login(data.email, data.password);
      // const { state } = props.location;
      // window.location = state ? state.from.pathname : "/";
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        error.email = ex.response.data;
        setError({ ...error, email: error.email });
        setProceedToDoSubmit(0);
      }
    }
  };

  useEffect(() => {
    if (proceedToDoSubmit === 1) doSubmit();
  }, [proceedToDoSubmit]);

  if (auth.getCurrentUser()) return <Navigate to="/" />;
  return (
    <Form>
      <Logo>
        Salon <span>Prauge</span>
      </Logo>
      <FormBox>
        <FormHeader variant="h4">Let's Login!</FormHeader>
        <FormContent>
          {renderInput("email", "Email", true)}
          {renderInput("password", "Password", true, "password")}
          <FormButton> {renderButton("Login", "#b99a5f")}</FormButton>
        </FormContent>
      </FormBox>
    </Form>
  );
};

export default withForm(LoginForm, loginData, loginSchema);
