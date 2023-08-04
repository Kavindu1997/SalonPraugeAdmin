import styled from "@emotion/styled";
import { Box, Typography, CardContent, Grid } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  height: "auto",
  overflow: "hidden",
}));

export const Section = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export const CardLabel = styled(Typography)(({ theme }) => ({
  color: blueGrey[400],
  margin: theme.spacing(2, 0),
  textTransform: "uppercase",
  textAlign: "center",
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.8rem",
    margin: theme.spacing(1, 0),
  },
}));

export const CardHeader = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  textTransform: "capitalize",
  textAlign: "center",
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.8rem",
    margin: theme.spacing(1, 0),
  },
}));

export const DisplayCard = styled(CardContent)(({ theme }) => ({
  position: "relative",
  padding: "0px !important",
  height: "140px",
}));

export const DisplayCardGraph = styled("canvas")(({ theme }) => ({
  width: "100%",
  height: "60px !important",
  position: "absolute",
  bottom: "0px",
  left: "0px",
  [theme.breakpoints.down("xs")]: {
    height: "45px !important",
  },
}));

export const Ratio = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0%",
  right: "5%",
  [theme.breakpoints.down("xs")]: {
    top: "45%",
    left: "25%",
  },
}));
