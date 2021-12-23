import { Close as CloseIcon } from "@mui/icons-material";
import { Box, IconButton, Modal as MuiModal, Typography } from "@mui/material";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
  pt: 2,
  "& > .close": {
    position: "absolute",
    right: 8,
    top: 5,
  },
};

export default function Modal({
  children,
  title,
  open,
  handleClose,
}: ModalProps) {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton className="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {title && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
          {children}
        </Typography>
      </Box>
    </MuiModal>
  );
}
