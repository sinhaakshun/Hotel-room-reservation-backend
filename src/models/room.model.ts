import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  roomNo: number;
  floor: number;
  indexOnFloor: number;
  occupied: boolean;
}

const RoomSchema = new Schema({
  roomNo: Number,
  floor: Number,
  indexOnFloor: Number,
  occupied: { type: Boolean, default: false }
});

export default mongoose.model<IRoom>("Room", RoomSchema);
