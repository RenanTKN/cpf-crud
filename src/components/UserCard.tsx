import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Phone as PhoneIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setEditUser } from "../features/user/editUserSlice";
import { setRemoveUser } from "../features/user/removeUserSlice";
import { RegisterUser, User } from "../types/user";
import { formatDate } from "../utils";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {user.nome[0]}
          </Avatar>
        }
        title={user.nome}
        subheader={formatDate(user.dataNascimento)}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          CPF: {user.cpf}
        </Typography>
        <Typography variant="body2">
          <PhoneIcon fontSize="small" /> {user.telefone}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Criado em: {formatDate(user.createdAt)}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Atuaizado em: {formatDate(user.updatedAt)}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip arrow title="Editar">
              <IconButton
                size="small"
                aria-label="edit"
                onClick={() =>
                  dispatch(
                    setEditUser({
                      cpf: user.cpf,
                      nome: user.nome,
                      telefone: user.telefone,
                      dataNascimento: user.dataNascimento.toString(),
                    } as RegisterUser)
                  )
                }
              >
                <EditIcon color="warning" />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Visualizar">
              <IconButton
                component={Link}
                to={`/${user.cpf}`}
                size="small"
                aria-label="share"
              >
                <VisibilityIcon color="info" />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Remover">
              <IconButton
                size="small"
                aria-label="share"
                color="error"
                onClick={() => dispatch(setRemoveUser(user.cpf))}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
