import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
	console.log("Server is running on port 7000");
});
