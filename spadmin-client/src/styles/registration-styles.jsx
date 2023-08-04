import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const Form = styled("form")(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(/assets/register.jpg)`,
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
  height: "600px",
  width: "550px",
  position: "absolute",
  left: "33%",
  top: "5%",
  [theme.breakpoints.up("lg")]: {
    width: "550px",
    height: "600px",
    left: "35%",
    top: "6%",
  },
  [theme.breakpoints.down("lg")]: {
    width: "550px",
    height: "600px",
  },
  [theme.breakpoints.down("md")]: {
    width: "400px",
    height: "550px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "300px",
    height: "500px",
    left: "25%",
    top: "6%",
  },
}));

export const FormHeader = styled(Typography)(({ theme }) => ({
  position: "relative",
  top: "20px",
  left: "7%",
  [theme.breakpoints.down("md")]: {
    top: "5px",
    left: "7%",
    fontSize: "25px",
  },
  [theme.breakpoints.down("sm")]: {
    top: "5px",
    left: "4%",
    fontSize: "20px",
  },
}));

export const FormContent = styled(Box)(({ theme }) => ({
  width: "400px",
  margin: "30px auto ",
  [theme.breakpoints.down("md")]: {
    width: "300px",
    margin: "0px auto ",
  },
  [theme.breakpoints.down("sm")]: {
    width: "230px",
  },
}));

export const FormButton = styled(Box)(({ theme }) => ({
  margin: "0px 180px",
  [theme.breakpoints.down("md")]: {
    margin: "10px 110px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px 60px",
  },
}));

export const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: "Nunito",
  fontWeight: "bold",
  fontSize: "35px",
  padding: "20px 20px",
  color: "#fcece5",
  "& span": {
    color: "#b99a5f",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    padding: "10px 10px",
  },
}));
