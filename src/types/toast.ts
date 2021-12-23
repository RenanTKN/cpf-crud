import { AlertColor } from "@mui/material";

export interface Toast {
  open: boolean;
  severity: AlertColor;
  message: string;
}
