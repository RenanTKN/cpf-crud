import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";

import { useAuth } from "../auth";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Campo obrigatório"),
      password: Yup.string().required("Campo obrigatório"),
    }),

    onSubmit: ({ username, password }) => {
      setIsLoading(true);
      auth.signin({ username, password }, () => {
        navigate(from, { replace: true });
      });
    },
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Card sx={{ width: 300 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            CPF CRUD
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Usuário"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              autoFocus
              required
              sx={{ mt: 2 }}
            />
            {formik.touched.username && formik.errors.username && (
              <Typography variant="subtitle2" color="error">
                {formik.errors.username}
              </Typography>
            )}
            <TextField
              label="Senha"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography variant="subtitle2" color="error">
                {formik.errors.password}
              </Typography>
            )}
            <Button
              variant="contained"
              color="success"
              type="submit"
              startIcon={<LoginIcon />}
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
          <CardActions>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                width: "100%",
                textAlign: "center",
                mt: 1,
              }}
            >
              Usuário: admin | Senha: admin
            </Typography>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
}
