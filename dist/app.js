"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = __importDefault(require("./db/mongo"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // if you need cookies/auth
}));
const db = mongo_1.default.getInstance();
db.connect();
app.use("/rooms", room_routes_1.default);
app.listen(process.env.APP_URL, () => console.log("Server running on port 3000"));
