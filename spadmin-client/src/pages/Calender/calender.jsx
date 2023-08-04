import { Badge, Calendar } from "antd";
import { useState, useEffect } from "react";
import { getClientReservations } from "../../services/reservationService";

const Calender = () => {
  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    const { data: clientReservations } = await getClientReservations();
    setReservations(clientReservations);
  };

  const getListData = (value) => {
    let listData = [];
    let tempReservations;
    tempReservations = reservations.filter(
      (reservation) => reservation.date === value.format("YYYY-MM-DD")
    );
    {
      tempReservations &&
        tempReservations.map((tempReservation) => {
          listData.push({
            type:
              tempReservation.status.name === "Pending" ? "warning" : "success",
            content:
              tempReservation.type.name +
              "-" +
              tempReservation.stylist.firstname,
          });
        });
    }
    return listData || [];
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};
export default Calender;
