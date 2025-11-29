"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const room_model_1 = __importDefault(require("../models/room.model"));
dotenv_1.default.config();
const TOTAL_FLOORS = 10;
async function seedRooms() {
    await mongoose_1.default.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB. Seeding rooms...");
    // Clear existing rooms
    await room_model_1.default.deleteMany({});
    const rooms = [];
    // Floors 1–9 → 10 rooms each (101–110, 201–210, ...)
    for (let floor = 1; floor <= 9; floor++) {
        for (let index = 1; index <= 10; index++) {
            const roomNo = floor * 100 + index;
            rooms.push({
                roomNo,
                floor,
                indexOnFloor: index, // 1 = closest to stairs, 10 = farthest
                occupied: false,
            });
        }
    }
    // Floor 10 → only 7 rooms (1001–1007)
    for (let index = 1; index <= 7; index++) {
        const roomNo = 1000 + index;
        rooms.push({
            roomNo,
            floor: 10,
            indexOnFloor: index,
            occupied: false,
        });
    }
    await room_model_1.default.insertMany(rooms);
    console.log("Seed complete! Total rooms:", rooms.length);
    process.exit(0);
}
seedRooms().catch((err) => {
    console.error("Error seeding rooms:", err);
    process.exit(1);
});
