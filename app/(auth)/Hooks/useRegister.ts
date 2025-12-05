"use client";
import { gql } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { AuthPayload, RegisterInput } from "../Types/auth";

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
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

export const useRegister = () => {
  const router = useRouter();

  const [registerMutation, { data, loading, error }] = useMutation<{
    register: AuthPayload;
  }>(REGISTER_MUTATION);

  const register = async (input: RegisterInput) => {
    try {
      const response = await registerMutation({
        variables: { input },
      });

      const authData = response.data?.register;
      if (!authData?.token) {
        throw new Error("Registration failed: No token returned");
      }

      Cookies.set("token", authData.token, { expires: 7 });
      Cookies.set("user_id", authData.user.id, { expires: 7 });
      router.push("/");

      return authData;
    } catch (err: any) {
      console.error("Register Error:", err);
      throw new Error(err.message || "Registration failed");
    }
  };

  return { register, data, loading, error };
};
