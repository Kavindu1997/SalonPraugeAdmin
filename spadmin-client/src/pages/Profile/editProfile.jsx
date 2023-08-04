import { Modal, Box, Typography } from "@mui/material";
import ProfileForm from "./profileForm";
import {
  ProfileCard,
  ProfileHeader,
  ProfileImage,
} from "../../styles/profile-styles";

const EditProfile = ({ open, close, firstname, lastname }) => {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ProfileCard>
        <ProfileHeader>
          <ProfileImage>
            <span>{firstname?.charAt(0)}</span>
            <span>{lastname?.charAt(0)}</span>
          </ProfileImage>
        </ProfileHeader>
        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          <ProfileForm />
        </Typography>
      </ProfileCard>
    </Modal>
  );
};

export default EditProfile;
