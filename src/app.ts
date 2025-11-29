import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import MongoDB from "./db/mongo";
import roomRoutes from "./routes/room.routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
}));

const db = MongoDB.getInstance();
db.connect();

app.use("/rooms", roomRoutes);

app.listen(process.env.APP_URL, () => console.log("Server running on port 3000"));
