import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AdminTable from "./adminTable";
import SearchBox from "../../components/common/searchBox";
import Pagination from "./../../components/common/pagination";
import { paginate } from "../../utils/paginate";
import { getUsers, deleteUser } from "../../services/userService";
import { Button } from "@mui/material";

const Admin = () => {
  const MySwal = withReactContent(Swal);
  const [adminUsers, setAdminUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "firstname",
    order: "asc",
  });
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAdminUsers();
  }, []);

  const getAdminUsers = async () => {
    const { data: adminUsers } = await getUsers();
    setAdminUsers(adminUsers);
  };

  const handleDelete = async (user) => {
    const originalAdminUsers = adminUsers;
    const adminFilteredUsers = originalAdminUsers.filter(
      (u) => u._id !== user._id
    );
    setAdminUsers(adminFilteredUsers);

    try {
      handleConfirm().then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(user._id);
          Swal.fire("Deleted successfully!", "", "success");
        } else {
          setAdminUsers(originalAdminUsers);
        }
      });
      //await deleteUser(user._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This admin user has already deleted.");

      setAdminUsers(originalAdminUsers);
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
    let filtered = adminUsers;
    if (searchQuery)
      filtered = adminUsers.filter(
        (u) =>
          u.firstname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          u.lastname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          u.joineddate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const filteredAdminUsers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: filteredAdminUsers };
  };

  const { totalCount, data: filteredAdminUsers } = getPagedData();

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
        to="/admin/new"
        style={{ marginBottom: 30 }}
        sx={{
          ":hover": {
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        Add New Admin
      </Button>
      <p>Showing {totalCount} users in the database...</p>
      <SearchBox
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search admin..."
        label="Search"
      />
      <AdminTable
        adminUsers={filteredAdminUsers}
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

export default Admin;
