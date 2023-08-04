import { Button } from "@mui/material";
import Table from "../../components/common/table";

const AdminTable = (props) => {
  const columns = [
    {
      path: "firstname",
      label: "First Name",
    },
    { path: "lastname", label: "Last Name" },
    { path: "email", label: "Email" },
    { path: "joineddate", label: "Joined Date" },
    {
      key: "delete",
      content: (adminUser) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => props.onDelete(adminUser)}
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

  const { adminUsers, onSort, sortColumn } = props;
  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={adminUsers}
    />
  );
};

export default AdminTable;
