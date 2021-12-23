import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../features/toast/toastSlice";

import { RootState } from "../store";

export default function Toast() {
  const toast = useSelector((state: RootState) => state.toast.value);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setToast({ open: false, severity: "success", message: "" }));
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={6000}
      onClose={handleClose}
      transitionDuration={0}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={toast.severity}
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
