import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getClientReservations } from "../../services/reservationService";
import { Card, CardContent, Divider, Paper, Typography } from "@mui/material";
import { lightGreen, red, yellow } from "@mui/material/colors";

const PieChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [reservations, setReservations] = useState(0);
  const [pendingReservations, setpendingReservations] = useState(0);
  const [completedReservations, setCompletedReservations] = useState(0);

  const getReservations = async () => {
    const { data: clientReservations } = await getClientReservations();
    setReservations(clientReservations.length);

    const pending = clientReservations.filter(
      (clientReservation) => clientReservation.status.name === "Pending"
    );
    setpendingReservations(pending.length);

    const completed = clientReservations.filter(
      (clientReservation) => clientReservation.status.name === "Completed"
    );
    setCompletedReservations(completed.length);
  };

  useEffect(() => {
    getReservations();
  }, []);

  const allReservations = [
    reservations,
    pendingReservations,
    completedReservations,
  ];

  return (
    <Card component={Paper}>
      <CardContent style={{ backgroundColor: "#C6C6C6" }}>
        <Typography variant="h6" align="center">
          Reservation Distribution
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <div>
          <Pie
            data={{
              labels: [
                "All Reservations",
                "Pending Reservations ",
                "Completed Reservations",
              ],
              datasets: [
                {
                  label: "Reservation Distribution",
                  data: allReservations,
                  backgroundColor: [
                    lightGreen["A400"],
                    red[500],
                    yellow["A200"],
                  ],
                  borderColor: [lightGreen[500], red[50], yellow[400]],
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={400}
            options={{
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    font: {
                      family: "poppins",
                    },
                  },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
