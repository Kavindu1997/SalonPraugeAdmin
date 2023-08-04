import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import withForm from "../../components/hoc/withForm";
import { saveClient, getClient } from "../../services/clientService";
import { FormBox } from "../../styles/client-styles";

const clientData = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
};

const clientSchema = Joi.object({
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
  phone: Joi.string().required().label("Phone Number"),
});

const ClientForm = ({
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
  let { id } = useParams();
  const MySwal = withReactContent(Swal);

  const doSubmit = async () => {
    try {
      const response = await saveClient(data);

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

  const populateClient = async () => {
    try {
      const clientId = id;
      if (clientId === "new") return;

      const { data: client } = await getClient(clientId);
      setData(mapToViewModel(client));
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        navigate("/not-found", { replace: true });
    }
  };

  const mapToViewModel = (client) => {
    return {
      _id: client._id,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      phone: client.phone,
    };
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Client updated successfully!",
      time: 1000,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/client");
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
        navigate("/client");
      }
    });
  };

  useEffect(() => {
    if (proceedToDoSubmit === 1) doSubmit();
  }, [proceedToDoSubmit]);

  useEffect(() => {
    populateClient();
  }, []);

  return (
    <form ref={form}>
      <h1>Client Form</h1>
      <FormBox>
        {renderInput("firstname", "First Name", true)}
        {renderInput("lastname", "Last Name", true)}
        {renderInput("email", "Email", true)}
        {renderInput("phone", "Phone Number", true)}
        {renderButton("Save Client")}
      </FormBox>
    </form>
  );
};

export default withForm(ClientForm, clientData, clientSchema);
