import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const PickerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "",
  marginBottom: "10px",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const PickerItem = styled(Box)(({ theme }) => ({
  width: "210px",
  [theme.breakpoints.down("lg")]: {
    display: "block",
    marginTop: "10px",
  },
}));

export const FormBox = styled(Box)(({ theme }) => ({
  width: "453px",
  [theme.breakpoints.down("lg")]: {
    width: "453px",
  },
  [theme.breakpoints.down("md")]: {
    width: "303px",
  },
}));
