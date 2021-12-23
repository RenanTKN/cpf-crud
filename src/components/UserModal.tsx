import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import CPF from "../services";
import { RegisterUser } from "../types/user";
import Modal from "./Modal";
import { formatDateField } from "../utils";
import { useDispatch } from "react-redux";
import { setToast } from "../features/toast/toastSlice";

interface UserModalProps {
  open: boolean;
  user?: RegisterUser;
  handleClose: () => void;
  onComplete?: () => void;
}

export default function UserModal({
  open,
  user,
  handleClose,
  onComplete,
}: UserModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      cpf: user?.cpf!,
      nome: user?.nome!,
      telefone: user?.telefone!,
      dataNascimento: formatDateField(user?.dataNascimento!),
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      cpf: Yup.string().required("Campo obrigatório"),
      nome: Yup.string().required("Campo obrigatório"),
      telefone: Yup.string().required("Campo obrigatório"),
      dataNascimento: Yup.date().required("Campo obrigatório"),
    }),

    onSubmit: (data) => {
      setIsLoading(true);
      isEdit()
        ? CPF.editUser(data).then((res) => {
            setIsLoading(false);
            if (res?.[0] === 1) {
              handleClose();
              onComplete?.();
              formik.resetForm();
              dispatch(
                setToast({
                  open: true,
                  severity: "success",
                  message: "Usuário editado com sucesso",
                })
              );
            } else {
              dispatch(
                setToast({
                  open: true,
                  severity: "error",
                  message: "Erro ao editar usuário",
                })
              );
            }
          })
        : CPF.addUser(data).then((res) => {
            setIsLoading(false);
            if (res?.status === 200) {
              handleClose();
              onComplete?.();
              formik.resetForm();
              dispatch(
                setToast({
                  open: true,
                  severity: "success",
                  message: "Usuário cadastrado com sucesso",
                })
              );
            } else {
              dispatch(
                setToast({
                  open: true,
                  severity: "error",
                  message: "Erro ao cadastrar usuário",
                })
              );
            }
          });
    },
  });

  const isEdit = () => !!user?.cpf;

  return (
    <Modal
      title={isEdit() ? "Editar usuário" : "Cadastrar usuário"}
      open={open}
      handleClose={handleClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="CPF"
              id="cpf"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
              sx={{ mt: 2 }}
              disabled={isEdit()}
              inputProps={{ maxLength: 11 }}
            />
            {formik.touched.cpf && formik.errors.cpf && (
              <Typography variant="subtitle2" color="error">
                {formik.errors.cpf}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              id="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
            />
            {formik.touched.nome && formik.errors.nome && (
              <Typography variant="subtitle2" color="error">
                {formik.errors.nome}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="tel"
              label="Telefone"
              id="telefone"
              value={formik.values.telefone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
            />
            {formik.touched.telefone && formik.errors.telefone && (
              <Typography variant="subtitle2" color="error">
                {formik.errors.telefone}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="Data de nascimento"
              id="dataNascimento"
              value={formik.values.dataNascimento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            {formik.touched.dataNascimento && formik.errors.dataNascimento && (
              <Typography variant="subtitle2" color="error">
                {formik.errors.dataNascimento}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              color="success"
              fullWidth
              disabled={isLoading}
            >
              {isEdit() ? "Editar" : "Cadastrar"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
