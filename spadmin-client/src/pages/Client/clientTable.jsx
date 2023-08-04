import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Table from "../../components/common/table";

const ClientTable = (props) => {
  const columns = [
    {
      path: "firstname",
      label: "First Name",
    },
    { path: "lastname", label: "Last Name" },
    { path: "email", label: "Email" },
    { path: "phone", label: "Phone Number" },
    {
      key: "edit",
      content: (clientUser) => (
        <Button
          variant="contained"
          color="info"
          component={Link}
          to={`/client/${clientUser._id}`}
          sx={{
            ":hover": {
              bgcolor: "white",
              color: "#0288d1",
            },
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      content: (clientUser) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => props.onDelete(clientUser)}
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

  const { clientUsers, onSort, sortColumn } = props;
  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={clientUsers}
    />
  );
};

export default ClientTable;
