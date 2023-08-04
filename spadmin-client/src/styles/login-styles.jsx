import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const Form = styled("form")(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(/assets/login.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "black",
  backgroundSize: "cover",
}));

export const FormBox = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.60)",
  boxShadow: "0px 8px 32px 0px #a5a5a5",
  backdropFilter: "blur(20.5px)",
  borderRadius: "10px",
  height: "400px",
  width: "500px",
  position: "absolute",
  left: "35%",
  top: "15%",
  [theme.breakpoints.down("lg")]: {
    width: "500px",
  },
  [theme.breakpoints.down("md")]: {
    width: "400px",
    height: "330px",
    left: "25%",
    top: "15%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "300px",
    height: "330px",
    left: "25%",
    top: "15%",
  },
}));

export const FormHeader = styled(Typography)(({ theme }) => ({
  position: "relative",
  top: "20px",
  left: "30%",
  [theme.breakpoints.down("sm")]: {
    top: "20px",
    left: "20%",
  },
}));

export const FormContent = styled(Box)(({ theme }) => ({
  width: "400px",
  margin: "50px auto ",
  [theme.breakpoints.down("md")]: {
    width: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "250px",
  },
}));

export const FormButton = styled(Box)(({ theme }) => ({
  margin: "20px 25% ",
  [theme.breakpoints.down("md")]: {
    margin: "0px 60px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px 40px",
  },
}));

export const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: "Nunito",
  fontWeight: "bold",
  fontSize: "35px",
  padding: "20px 20px",
  "& span": {
    color: "#b99a5f",
  },
}));
