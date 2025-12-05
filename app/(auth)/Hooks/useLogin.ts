"use client";

import { gql } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { AuthPayload, LoginInput } from "../Types/auth";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstname
        email
        role
      }
    }
  }
`;

export const useLogin = () => {
  const router = useRouter();

  const [loginMutation, { data, loading, error }] = useMutation<{
    login: AuthPayload;
  }>(LOGIN_MUTATION);

  const login = async (input: LoginInput) => {
    try {
      const response = await loginMutation({
        variables: {
          email: input.email,
          password: input.password,
        },
      });

      const authData = response.data?.login;

      if (!authData?.token) {
        throw new Error("Login failed: No token returned");
      }

      Cookies.set("token", authData.token, { expires: 7 });
     Cookies.set("user_id", authData.user.id, { expires: 7 });
      router.push("/");

      return authData;
    } catch (err: any) {
      console.error("Login error:", err);
      throw new Error(err.message || "Login failed");
    }
  };

  return { login, data, loading, error };
};
