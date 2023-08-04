import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Joi from "joi";
import withForm from "../../components/hoc/withForm";
import {
  saveReservation,
  getReservation,
} from "../../services/reservationService";
import { getTypes } from "../../services/typeService";
import { getStatus } from "../../services/statusService";
import { getAvailableUsers } from "../../services/userService";
import { getClients } from "../../services/clientService";
import {
  PickerContainer,
  PickerItem,
  FormBox,
} from "../../styles/reservation-styles";

const reservationData = {
  serviceId: "",
  clientId: "",
  stylistId: "",
  statusId: "",
  date: null,
  time: null,
};

const reservationSchema = Joi.object({
  _id: Joi.string(),
  serviceId: Joi.string().required().label("Service"),
  clientId: Joi.string().required().label("Client"),
  stylistId: Joi.string().required().label("Stylist"),
  statusId: Joi.string().required().label("Status"),
  date: Joi.string().required().label("Date"),
  time: Joi.string()
    .regex(/^((0[8-9]|1[0-1]):(00) AM)|((0[1-5]):(00) PM)$/)
    .required()
    .label("Time")
    .messages({
      "string.pattern.base": "Time Should be within 8AM - 5PM",
    }),
});

const ReservationForm = ({
  data,
  setData,
  error,
  setError,
  renderSelect,
  renderAntDatePicker,
  renderAntTimePicker,
  renderButton,
  proceedToDoSubmit,
  setProceedToDoSubmit,
}) => {
  const [types, setTypes] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState([]);
  const MySwal = withReactContent(Swal);
  const form = useRef();
  const navigate = useNavigate();
  let { id } = useParams();

  const doSubmit = async () => {
    try {
      const response = await saveReservation(data);

      if (response.status === 201 || response.status === 200) {
        handleSuccess();
      } else {
        handleFailure();
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        error.time = ex.response.data;
        setError({ ...error, time: error.time });
        setProceedToDoSubmit(0);
      }
    }
  };

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Booking updated successfully!",
      time: 1000,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/reservation");
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
        navigate("/reservation");
      }
    });
  };

  const populateTypes = async () => {
    const { data: types } = await getTypes();
    setTypes(types);
  };

  const populateStatus = async () => {
    const { data: status } = await getStatus();
    setStatus(status);
  };

  const populateAvailableStylists = async () => {
    const { data: stylists } = await getAvailableUsers(data);
    const formatStylists = stylists.map((stylist) => ({
      _id: stylist._id,
      name: stylist.firstname + " " + stylist.lastname,
    }));

    setStylists(formatStylists);
  };

  const populateClients = async () => {
    const { data: clients } = await getClients();
    const formatClients = clients.map((client) => ({
      _id: client._id,
      name: client.firstname + " " + client.lastname,
    }));

    setClients(formatClients);
  };

  const populateReservation = async () => {
    try {
      const reservationId = id;
      if (reservationId === "new") return;

      const { data: reservation } = await getReservation(reservationId);
      setData(mapToViewModel(reservation));
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        navigate("/not-found", { replace: true });
    }
  };

  const mapToViewModel = (reservation) => {
    return {
      _id: reservation._id,
      serviceId: reservation.type._id,
      clientId: reservation.client._id,
      stylistId: reservation.stylist._id,
      statusId: reservation.status._id,
      date: reservation.date,
      time: reservation.time,
    };
  };

  useEffect(() => {
    if (proceedToDoSubmit === 1) doSubmit();
  }, [proceedToDoSubmit]);

  useEffect(() => {
    populateReservation();
    populateTypes();
    populateClients();
    populateStatus();
  }, []);

  useEffect(() => {
    populateAvailableStylists();
  }, [data.date, data.time]);

  return (
    <form ref={form}>
      <h1>Reservation Form</h1>
      <FormBox>
        {renderSelect("serviceId", "Select Service", types)}
        {renderSelect("clientId", "Client", clients)}
        <PickerContainer>
          <PickerItem>{renderAntDatePicker()}</PickerItem>
          <PickerItem>{renderAntTimePicker()}</PickerItem>
        </PickerContainer>
        {renderSelect("stylistId", "Stylist", stylists)}
        {renderSelect("statusId", "Status", status)}

        {renderButton("Save Reservation")}
      </FormBox>
    </form>
  );
};

export default withForm(ReservationForm, reservationData, reservationSchema);
