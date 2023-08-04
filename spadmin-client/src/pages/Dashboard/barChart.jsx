import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale } from "chart.js";
import { BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getRandomColor } from "./fakeDataGenerator";
import { getEachDayReservations } from "../../services/reservationService";
import { Card, CardContent, Divider, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getUser } from "./../../services/userService";

const BarChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [stylists, setStylists] = useState([]);
  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    const { data: clientReservations } = await getEachDayReservations();

    const users = [];
    const counts = [];
    for (var i = 0; i < clientReservations.length; i++) {
      const stylistId = clientReservations[i].stylist;
      const { data: user } = await getUser(stylistId);
      users.push(user.firstname);
    }
    setStylists(users);

    for (var j = 0; j < clientReservations.length; j++) {
      const day_count = clientReservations[j].day_count;
      counts.push(day_count);
    }
    setReservations(counts);
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <Card component={Paper}>
      <CardContent style={{ backgroundColor: "#C6C6C6" }}>
        <Typography variant="h6" align="center">
          Stylists Time Distribution
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <div>
          <Bar
            data={{
              labels: stylists,
              datasets: [
                {
                  label: "Time Distribution (per day)",
                  data: reservations,
                  backgroundColor: getRandomColor(reservations.length),
                  borderColor: [grey[50]],
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={400}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max: 8,
                  title: {
                    display: true,
                    text: "Reservations per day",
                    font: {
                      size: 14,
                      family: "poppins",
                    },
                  },
                  ticks: {
                    font: {
                      family: "poppins",
                      size: 12,
                    },
                  },
                },

                x: {
                  title: {
                    display: true,
                    text: "Stylist Name",
                    font: {
                      size: 14,
                      family: "poppins",
                    },
                  },
                  ticks: {
                    font: {
                      family: "poppins",
                      size: 12,
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
