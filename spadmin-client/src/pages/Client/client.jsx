import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ClientTable from "./clientTable";
import SearchBox from "../../components/common/searchBox";
import Pagination from "./../../components/common/pagination";
import { paginate } from "../../utils/paginate";
import { getClients, deleteClient } from "../../services/clientService";
import { Button } from "@mui/material";

const Client = () => {
  const MySwal = withReactContent(Swal);
  const [clientUsers, setClientUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "firstname",
    order: "asc",
  });
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const getClientUsers = async () => {
    const { data: clientUsers } = await getClients();
    setClientUsers(clientUsers);
  };

  useEffect(() => {
    getClientUsers();
  }, []);

  const handleDelete = async (user) => {
    const originalClientUsers = clientUsers;
    const clientFilteredUsers = originalClientUsers.filter(
      (u) => u._id !== user._id
    );
    setClientUsers(clientFilteredUsers);

    try {
      handleConfirm().then(async (result) => {
        if (result.isConfirmed) {
          await deleteClient(user._id);
          Swal.fire("Deleted successfully!", "", "success");
        } else {
          setClientUsers(originalClientUsers);
        }
      });
      //await deleteClient(user._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This client has already deleted.");

      setClientUsers(originalClientUsers);
    }
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = clientUsers;
    if (searchQuery)
      filtered = clientUsers.filter(
        (u) =>
          u.firstname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          u.lastname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          u.phone.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const filteredClientUsers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: filteredClientUsers };
  };

  const { totalCount, data: filteredClientUsers } = getPagedData();

  const handleConfirm = () => {
    return MySwal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#ffd600",
      confirmButtonText: "Yes, delete it!",
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/client/new"
        style={{ marginBottom: 30 }}
        sx={{
          ":hover": {
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        Add New Client
      </Button>
      <p>Showing {totalCount} clients in the database...</p>
      <SearchBox
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search client..."
        label="Search Client"
      />
      <ClientTable
        clientUsers={filteredClientUsers}
        sortColumn={sortColumn}
        onDelete={handleDelete}
        onSort={handleSort}
      />
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Client;
