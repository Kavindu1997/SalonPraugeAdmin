import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withForm from "../../components/hoc/withForm";
import { FormBox } from "./../../styles/admin-styles";
import { inviteUser } from "../../services/userService";

const adminData = {
  firstname: "",
  lastname: "",
  email: "",
};

const adminSchema = Joi.object({
  firstname: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .label("First Name")
    .messages({
      "string.pattern.base":
        "First name should not contain any numbers or special characters",
    }),
  lastname: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .label("Last Name")
    .messages({
      "string.pattern.base":
        "Last name should not contain any numbers or special characters",
    }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("Email"),
});

const AdminForm = ({ data, renderInput, renderButton, proceedToDoSubmit }) => {
  const form = useRef();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const doSubmit = async () => {
    const response = await inviteUser(data);
    if (response.status === 200) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Email sent successfully!",
      time: 1000,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin");
      }
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Something went wrong!",
      time: 1000,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin");
      }
    });
  };

  useEffect(() => {
    if (proceedToDoSubmit === 1) doSubmit();
  }, [proceedToDoSubmit]);

  return (
    <form ref={form}>
      <h1>Admin Form</h1>
      <FormBox>
        {renderInput("firstname", "First Name", true)}
        {renderInput("lastname", "Last Name", true)}
        {renderInput("email", "Email", true)}
        {renderButton("Send Email")}
      </FormBox>
    </form>
  );
};

export default withForm(AdminForm, adminData, adminSchema);
