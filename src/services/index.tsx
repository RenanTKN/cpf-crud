import axios from "axios";
import { RegisterUser } from "../types/user";

const apikey = process.env.REACT_APP_MARVEL_API_KEY;

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://cpf-crud-backend.herokuapp.com"
      : "http://localhost:5000",
  params: { apikey },
});

class CPF {
  getUsers = async () => {
    return await instance
      .get("/pessoas")
      .then((res) => res?.data)
      .catch((e) => {
        console.log(e);
      });
  };

  getUser = async (cpf: string) =>
    await instance
      .get(`/pessoas/${cpf}`)
      .then((res) => res?.data)
      .catch((e) => {
        console.log(e);
      });

  addUser = async (data: RegisterUser) =>
    await instance
      .post("/pessoas", data)
      .then((res) => res)
      .catch((e) => {
        console.log(e);
      });

  editUser = async (data: RegisterUser) =>
    await instance
      .put(`/pessoas/${data.cpf}`, data)
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
      });

  deleteUser = async (cpf: string) =>
    await instance
      .delete(`/pessoas/${cpf}`)
      .then((res) => res?.data)
      .catch((e) => {
        console.log(e);
      });
}

export default new CPF();
