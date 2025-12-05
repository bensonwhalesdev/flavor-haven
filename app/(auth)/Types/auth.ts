export interface RegisterInput {
  firstname: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstname: string;
  email: string;
  role: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

