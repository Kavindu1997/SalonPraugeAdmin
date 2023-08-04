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
