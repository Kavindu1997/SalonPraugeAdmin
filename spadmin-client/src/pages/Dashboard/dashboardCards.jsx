import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import {
  CardLabel,
  CardHeader,
  DisplayCard,
  DisplayCardGraph,
  Ratio,
  Content,
  Section,
} from "../../styles/dashboard-styles";
import { getClientReservations } from "../../services/reservationService";
import { getClients } from "../../services/clientService";

const DashboardCards = () => {
  const [clients, setClients] = useState(0);
  const [pendingReservations, setpendingReservations] = useState(0);
  const [reservations, setReservations] = useState(0);

  const getReservations = async () => {
    const { data: clientReservations } = await getClientReservations();
    setReservations(clientReservations.length);
    const pending = clientReservations.filter(
      (clientReservation) => clientReservation.status.name === "Pending"
    );
    setpendingReservations(pending.length);
  };

  useEffect(() => {
    getReservations();
  }, []);

  const getClientUsers = async () => {
    const { data: clientUsers } = await getClients();
    setClients(clientUsers.length);
  };

  useEffect(() => {
    getClientUsers();
  }, []);

  const DisplayData = [
    {
      label: "Total Reservations",
      value: reservations,
      icon: <TrendingUpIcon style={{ color: green["A400"], fontSize: 40 }} />,
      iconLabel: "",
    },
    {
      label: "Total Clients",
      value: clients,
      icon: <PeopleIcon style={{ color: blue["A400"], fontSize: 40 }} />,
      iconLabel: "",
    },
    {
      label: "Pending Reservations",
      value: pendingReservations,
      icon: <MoodBadIcon style={{ color: red[500], fontSize: 40 }} />,
      iconLabel: "",
    },
  ];

  return (
    <>
      <Content>
        <Box mt={2}>
          <Section container spacing={1} justify="center">
            {DisplayData.map((item, i) => (
              <Grid key={i} item xs={12} sm={4} md={4}>
                <Card>
                  <DisplayCard>
                    <DisplayCardGraph id={item.label}></DisplayCardGraph>
                    <Box>
                      <CardLabel variant="subtitle2" gutterBottom={true}>
                        {item.label}
                      </CardLabel>

                      {(() => {
                        switch (item.label) {
                          case "Total Clients":
                            return (
                              <CardHeader
                                variant="h4"
                                component="h2"
                                sx={{ color: blue["A400"] }}
                              >
                                <CountUp end={item.value} duration={0.5} />
                              </CardHeader>
                            );
                          case "Pending Reservations":
                            return (
                              <CardHeader
                                variant="h4"
                                component="h2"
                                sx={{ color: red[500] }}
                              >
                                <CountUp end={item.value} duration={0.75} />
                              </CardHeader>
                            );
                          case "Total Reservations":
                            return (
                              <CardHeader
                                variant="h4"
                                component="h2"
                                sx={{ color: green["A400"] }}
                              >
                                <CountUp end={item.value} duration={1.0} />
                              </CardHeader>
                            );
                          default:
                            return null;
                        }
                      }).call(this)}
                      <Ratio>
                        <Button startIcon={item.icon} size="small"></Button>
                      </Ratio>
                    </Box>
                  </DisplayCard>
                </Card>
              </Grid>
            ))}
          </Section>
        </Box>
      </Content>
    </>
  );
};

export default DashboardCards;
