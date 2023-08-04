import { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  getClientReservations,
  saveReservation,
} from "../../services/reservationService";
import { message } from "antd";
import { cyan, lightGreen, purple, pink } from "@mui/material/colors";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalenderScheduler = () => {
  const [reservations, setReservations] = useState([]);
  const getReservations = async () => {
    let calenderData = [];
    const { data: clientReservations } = await getClientReservations();
    clientReservations.map((clientReservation) => {
      return calenderData.push({
        id: clientReservation._id,
        title:
          clientReservation.type.name +
          "(" +
          clientReservation.time +
          ")" +
          "-" +
          clientReservation.client.firstname +
          " " +
          clientReservation.client.lastname +
          "(" +
          clientReservation.status.name +
          ")",
        start: clientReservation.date,
        end: clientReservation.date,
        client: clientReservation.client,
        type: clientReservation.type,
        stylist: clientReservation.stylist,
        status: clientReservation.status,
        time: clientReservation.time,
      });
    });
    setReservations(calenderData);
  };

  useEffect(() => {
    getReservations();
  }, []);

  const onEventDrop = async (data) => {
    const updatedData = {
      _id: data.event.id,
      clientId: data.event.client._id,
      serviceId: data.event.type._id,
      stylistId: data.event.stylist._id,
      statusId: data.event.status._id,
      date: moment(data.start).format("YYYY-MM-DD"),
      time: data.event.time,
    };

    if (
      reservations.find(
        (reservation) =>
          reservation.stylist._id === updatedData.stylistId &&
          reservation.time === updatedData.time &&
          reservation.start === updatedData.date
      ) ||
      updatedData.date < moment().format("YYYY-MM-DD")
    ) {
      message.error("This time slot is not available");
    } else {
      const response = await saveReservation(updatedData);
      if (response.status === 201 || response.status === 200) {
        getReservations();
        message.success("Reservation successfully updated");
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={reservations}
        localizer={localizer}
        onEventDrop={onEventDrop}
        resizable
        views={["month"]}
        style={{
          height: "100vh",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        eventPropGetter={(event) => {
          let backgroundColor = "";
          switch (event.type.name) {
            case "Haircut":
              backgroundColor = cyan[500];
              break;

            case "Hair Styling":
              backgroundColor = purple[400];
              break;

            case "Makeup":
              backgroundColor = pink[400];
              break;

            case "Coloring":
              backgroundColor = lightGreen[500];
              break;
          }
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
};

export default CalenderScheduler;
