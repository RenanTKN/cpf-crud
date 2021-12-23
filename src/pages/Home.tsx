import React from "react";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";
import { setRemoveUser } from "../features/user/removeUserSlice";
import { setUsers } from "../features/user/usersSlice";
import CPF from "../services";
import { RootState } from "../store";
import { setEditUser } from "../features/user/editUserSlice";
import { RegisterUser } from "../types/user";
import { setToast } from "../features/toast/toastSlice";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRemoveModalLoading, setIsRemoveModalLoading] = React.useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = React.useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.value);
  const editUser = useSelector((state: RootState) => state.editUser.value);
  const removeUser = useSelector((state: RootState) => state.removeUser.value);

  const updateUsers = React.useCallback(() => {
    setIsLoading(true);
    CPF.getUsers().then((res) => {
      dispatch(setUsers(res));
      setIsLoading(false);
    });
  }, [dispatch]);

  React.useEffect(() => {
    updateUsers();
  }, [updateUsers]);

  const clearRemoveUser = () => dispatch(setRemoveUser(""));

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 5, pb: 5 }}>
        <Box textAlign="center" mb={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsRegisterModalOpen(true)}
          >
            Cadastrar usuário
          </Button>
        </Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container justifyContent="center" spacing={2}>
            {users.length === 0 ? (
              <Grid item>Nenhum usuário cadastrado.</Grid>
            ) : (
              users.map((user) => (
                <Grid item key={user.cpf}>
                  <UserCard user={user} />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
      <Modal
        title="Remover usuário"
        open={!!removeUser}
        handleClose={clearRemoveUser}
      >
        <Typography>
          Remover usuário com CPF: <strong>{removeUser}</strong>?
        </Typography>
        <Box display="flex" mt={3} justifyContent="right">
          <Button variant="outlined" sx={{ mr: 1 }} onClick={clearRemoveUser}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setIsRemoveModalLoading(true);
              CPF.deleteUser(removeUser).then((res) => {
                setIsRemoveModalLoading(false);
                if (res === 1) {
                  clearRemoveUser();
                  setTimeout(updateUsers, 500);
                  dispatch(
                    setToast({
                      open: true,
                      severity: "success",
                      message: "Usuário removido com sucesso",
                    })
                  );
                } else {
                  dispatch(
                    setToast({
                      open: true,
                      severity: "error",
                      message: "Erro ao remover usuário",
                    })
                  );
                }
              });
            }}
            disabled={isRemoveModalLoading}
          >
            Remover
          </Button>
        </Box>
      </Modal>
      <UserModal
        open={isRegisterModalOpen || !!editUser.cpf}
        user={editUser}
        handleClose={() => {
          setIsRegisterModalOpen(false);
          dispatch(
            setEditUser({
              cpf: "",
              nome: "",
              telefone: "",
              dataNascimento: "",
            } as RegisterUser)
          );
        }}
        onComplete={updateUsers}
      />
    </>
  );
}
