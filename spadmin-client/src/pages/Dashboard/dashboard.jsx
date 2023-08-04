import { Grid } from "@mui/material";
import DashboardCards from "./dashboardCards";
import PieChart from "./pieChart";
import BarChart from "./barChart";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <DashboardCards />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8} md={5}>
          <PieChart />
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <BarChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
