import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./schemas/typeDefs/typeDefs";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { resolvers } from "./schemas/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const verifyToken = (token: string) => {
  try {
    const cleanToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(
      cleanToken,
      process.env.NEXT_JWT_SECRET as string
    );
    return decoded; // { id, iat, exp }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      console.warn("JWT expired at:", error.expiredAt);
      return null; // force re-login
    }
    console.error("JWT verification failed:", error);
    return null;
  }
};

const apolloHandler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization") || "";
    const user = authHeader ? verifyToken(authHeader) : null;
    return { user };
  },
});

export async function GET(request: NextRequest) {
  return apolloHandler(request);
}

export async function POST(request: NextRequest) {
  return apolloHandler(request);
}
