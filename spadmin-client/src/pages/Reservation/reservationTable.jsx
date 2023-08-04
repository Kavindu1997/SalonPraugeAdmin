import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Table from "../../components/common/table";

const ReservationTable = (props) => {
  const columns = [
    {
      doublepath: "client.firstname,client.lastname",
      label: "Client",
    },
    { path: "type.name", label: "Type" },
    { path: "date", label: "Date" },
    { path: "time", label: "Time" },
    { path: "status.name", label: "Booking Status" },
    {
      key: "update",
      content: (reservation) => (
        <Button
          variant="contained"
          color="info"
          component={Link}
          to={`/reservation/${reservation._id}`}
          sx={{
            ":hover": {
              bgcolor: "white",
              color: "#0288d1",
            },
          }}
        >
          Update
        </Button>
      ),
    },
    {
      key: "delete",
      content: (reservation) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => props.onDelete(reservation)}
          sx={{
            ":hover": {
              bgcolor: "white",
              color: "#d32f2f",
            },
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const { reservations, onSort, sortColumn } = props;
  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={reservations}
    />
  );
};

export default ReservationTable;
