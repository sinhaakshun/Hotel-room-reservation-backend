import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "../models/room.model";

dotenv.config();

const TOTAL_FLOORS = 10;

async function seedRooms() {
  await mongoose.connect(process.env.MONGO_URL as string);

  console.log("Connected to MongoDB. Seeding rooms...");

  // Clear existing rooms
  await Room.deleteMany({});

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

  await Room.insertMany(rooms);

  console.log("Seed complete! Total rooms:", rooms.length);
  process.exit(0);
}

seedRooms().catch((err) => {
  console.error("Error seeding rooms:", err);
  process.exit(1);
});
