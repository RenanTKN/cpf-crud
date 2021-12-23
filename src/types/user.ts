export interface User {
  cpf: string;
  nome: string;
  telefone: string;
  dataNascimento: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterUser {
  cpf: string;
  nome: string;
  telefone: string;
  dataNascimento: string;
}
