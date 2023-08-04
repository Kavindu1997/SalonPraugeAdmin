import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Player } from "@lottiefiles/react-lottie-player";
import notFound from "../assets/not-found.json";

const Notfound = () => {
  let navigate = useNavigate();
  return (
    <div>
      <div>
        <IconButton
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <KeyboardArrowLeftIcon fontSize="large" color="secondary" />
          <span>Go Back</span>
        </IconButton>
        <Box
          style={{
            height: "600px",
            width: "600px",
            position: "absolute",
            left: "35%",
            top: "8%",
          }}
        >
          <Player autoplay loop src={notFound} />
        </Box>
      </div>
    </div>
  );
};

export default Notfound;
