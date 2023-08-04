import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReservationTable from "./reservationTable";
import SearchBox from "../../components/common/searchBox";
import Pagination from "./../../components/common/pagination";
import { paginate } from "../../utils/paginate";
import {
  getClientReservations,
  deleteReservation,
} from "../../services/reservationService";
import { Button } from "@mui/material";

const Reservation = () => {
  const MySwal = withReactContent(Swal);
  const [reservations, setReservations] = useState([]);
  const [sortColumn, setSortColumn] = useState({
    path: "date",
    order: "asc",
  });
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const getReservations = async () => {
    const { data: clientReservations } = await getClientReservations();
    setReservations(clientReservations);
  };

  const handleDelete = async (reservation) => {
    const originalReservations = reservations;
    const clientFilteredReservations = originalReservations.filter(
      (r) => r._id !== reservation._id
    );
    setReservations(clientFilteredReservations);

    try {
      handleConfirm().then(async (result) => {
        if (result.isConfirmed) {
          await deleteReservation(reservation._id);
          Swal.fire("Deleted successfully!", "", "success");
        } else {
          setReservations(originalReservations);
        }
      });
      //await deleteReservation(reservation._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This reservation has already deleted.");

      setReservations(originalReservations);
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
    let filtered = reservations;
    if (searchQuery)
      filtered = reservations.filter(
        (r) =>
          r.client.firstname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          r.client.lastname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          r.type.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          r.status.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          r.date.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          r.time.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const filteredClientReservations = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: filteredClientReservations };
  };

  const { totalCount, data: filteredClientReservations } = getPagedData();

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

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/reservation/new"
        style={{ marginBottom: 30 }}
        sx={{
          ":hover": {
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        Add New Reservation
      </Button>
      <p>Showing {totalCount} reservations in the database...</p>
      <SearchBox
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search reservation..."
        label="Search Reservation"
      />
      <ReservationTable
        reservations={filteredClientReservations}
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

export default Reservation;
