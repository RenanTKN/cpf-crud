import React from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import CPF from "../services";
import { User } from "../types/user";
import { formatDate } from "../utils";

export default function UserInfo() {
  const [user, setUser] = React.useState<User>();
  const { cpf } = useParams<"cpf">();

  const isLoading = () => !!user;

  React.useEffect(() => {
    CPF.getUser(cpf!).then((res) => setUser(res));
  }, [cpf]);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
        Informações
      </Typography>
      {isLoading() ? (
        <>
          <Typography>Nome: {user?.nome}</Typography>
          <Typography>CPF: {user?.cpf}</Typography>
          <Typography>Telefone: {user?.telefone}</Typography>
          <Typography>
            Data de Nascimento: {formatDate(user?.dataNascimento!)}
          </Typography>
          <Typography>Criado em: {formatDate(user?.createdAt!)}</Typography>
          <Typography>Atualizado em: {formatDate(user?.updatedAt!)}</Typography>
        </>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
