"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";

export type AuthUser = {
  id: string;
  firstname: string;
  email: string;
  role: string;
} | null;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstname
      email
      role
      postedRecipes {
        id
        title
      }
      likedRecipes {
        id
        title
      }
    }
  }
`;

export const useAuth = () => {
  const router = useRouter();
  const userId = Cookies.get("user_id");
  const token = Cookies.get("token");

  const { data, loading, error, refetch } = useQuery<{ user: AuthUser }>(
    GET_USER,
    {
      variables: { id: userId },
      skip: !token || !userId,
      fetchPolicy: "network-only",
    }
  );

  const [user, setUser] = useState<AuthUser>(null);

  // Update user state whenever data changes
  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, [data]);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    setUser(null);
    router.push("/"); // smoother client-side redirect
  };

  return { user, loading, error, logout, refetch };
};
