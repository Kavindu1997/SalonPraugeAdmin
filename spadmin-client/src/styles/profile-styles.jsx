import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const FormBox = styled(Box)(({ theme }) => ({
  width: "453px",
  [theme.breakpoints.down("lg")]: {
    width: "453px",
  },
  [theme.breakpoints.down("md")]: {
    width: "303px",
  },
}));

export const FormContent = styled(Box)(({ theme }) => ({
  width: "300px",
  margin: "20px 100px ",
  [theme.breakpoints.down("md")]: {
    width: "300px",
    margin: "0px auto ",
  },
  [theme.breakpoints.down("sm")]: {
    width: "230px",
  },
}));

export const FormButton = styled(Box)(({ theme }) => ({
  margin: "0px 165px 30px ",
  [theme.breakpoints.down("md")]: {
    margin: "10px 110px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px 60px",
  },
}));

export const ProfileCard = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "#fafafa",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
}));

export const ProfileHeader = styled(Box)(({ theme }) => ({
  height: "100px",
  background:
    "linear-gradient(90deg, rgba(165,165,165,1) 25%, rgba(185,154,95,1) 55%, rgba(252,236,229,1) 85%)",
}));

export const ProfileImage = styled(Box)(({ theme }) => ({
  height: "100px",
  width: "100px",
  background: "white",
  borderRadius: "50%",
  padding: "20px",
  transform: "translate(195px,45px)",
  border: "2px solid rgba(185,154,95,1)",
  fontWeight: "bold",
  fontSize: "35px",
  color: "#4e5052",
  textTransform: "capitalize",
  textAlign: "center",
  lineHeight: "60px",
}));
