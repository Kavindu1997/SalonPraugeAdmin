import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withForm from "../../components/hoc/withForm";
import {
  FormBox,
  FormContent,
  FormButton,
} from "./../../styles/profile-styles";
import { getUser, saveUser } from "../../services/userService";
import auth from "../../services/authService";

const profileData = {
  firstname: "",
  lastname: "",
  email: "",
};

const profileSchema = Joi.object({
  _id: Joi.string(),
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

const ProfileForm = ({
  data,
  setData,
  error,
  setError,
  renderInput,
  renderButton,
  proceedToDoSubmit,
  setProceedToDoSubmit,
}) => {
  const form = useRef();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const doSubmit = async () => {
    try {
      const response = await saveUser(data);
      if (response.status === 201 || response.status === 200) {
        handleSuccess();
      } else {
        handleFailure();
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        error.email = ex.response.data;
        setError({ ...error, email: error.email });
        setProceedToDoSubmit(0);
      }
    }
  };

  const populateProfile = async () => {
    try {
      const currentUser = auth.getCurrentUser();

      const { data: user } = await getUser(currentUser._id);
      setData(mapToViewModel(user));
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        navigate("/not-found", { replace: true });
    }
  };

  const mapToViewModel = (user) => {
    return {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Profile updated successfully!",
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

  useEffect(() => {
    populateProfile();
  }, []);

  return (
    <form ref={form}>
      <FormBox>
        <FormContent>
          {renderInput("firstname", "First Name", true)}
          {renderInput("lastname", "Last Name", true)}
          {renderInput("email", "Email", true)}
        </FormContent>
        <FormButton>{renderButton("Save Profile", "#827865")}</FormButton>
      </FormBox>
    </form>
  );
};

export default withForm(ProfileForm, profileData, profileSchema);
