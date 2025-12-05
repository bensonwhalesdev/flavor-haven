import UserModel from "@/app/api/models/user.model";
import { connectDB } from "@/app/utils/connectdb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "thisisaseceret";

export const authResolvers = {
  Mutation: {
    register: async (_: any, { input }: any) => {
      try {
        await connectDB();

        const { firstname, email, password } = input;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
          firstname,
          email,
          password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return { user: newUser, token };
      } catch (error: any) {
        throw new Error(error.message || "Registration failed");
      }
    },

    login: async (_: any, { email, password }: any) => {
      try {
        await connectDB();

        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return { user, token };
      } catch (error: any) {
        throw new Error(error.message || "Login failed");
      }
    },
  },
};
