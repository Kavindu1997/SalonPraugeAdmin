import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Joi from "joi";
import withForm from "../../components/hoc/withForm";
import * as registerService from "../../services/registerService";
import auth from "../../services/authService";
import { Form, FormBox, FormHeader } from "../../styles/registration-styles";
import {
  FormContent,
  FormButton,
  Logo,
} from "../../styles/registration-styles";

const registerData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const registerSchema = Joi.object({
  firstname: Joi.string().required().label("First Name"),
  lastname: Joi.string().required().label("Last Name"),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("Email"),
  password: Joi.string().required().min(5).label("Password"),
  confirmpassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({
      "any.only": "{{label}} must match Password",
    }),
});

const RegisterForm = ({
  data,
  setData,
  error,
  setError,
  renderInput,
  renderButton,
  proceedToDoSubmit,
  setProceedToDoSubmit,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const doSubmit = async () => {
    try {
      const response = await registerService.register(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/dashboard";
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

  useEffect(() => {
    const token = searchParams.get("key");
    const inviteUser = auth.getInviteUser(token);
    setData({ ...data, email: inviteUser.email });
  }, []);

  if (auth.getCurrentUser()) return <Navigate to="/" />;
  return (
    <Form>
      <Logo>
        Salon <span>Prauge</span>
      </Logo>
      <FormBox>
        <FormHeader variant="h4">Welcome to the Registration</FormHeader>
        <FormContent>
          {renderInput("firstname", "First Name", true)}
          {renderInput("lastname", "Last Name", true)}
          {renderInput("email", "Email", true, "text", true)}
          {renderInput("password", "Password", true, "password")}
          {renderInput("confirmpassword", "Confirm Password", true, "password")}
        </FormContent>
        <FormButton> {renderButton("Register", "#a5a5a5")}</FormButton>
      </FormBox>
    </Form>
  );
};

export default withForm(RegisterForm, registerData, registerSchema);
