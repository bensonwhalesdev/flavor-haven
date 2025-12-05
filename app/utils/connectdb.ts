import mongoose from "mongoose";

const MONGODB_URL = process.env.NEXT_MONGODB_URL;

export async function connectDB (){
    if (!MONGODB_URL) {
       throw new Error("No MONGODB_URL found"); 
    }
    mongoose.connect(MONGODB_URL);
};