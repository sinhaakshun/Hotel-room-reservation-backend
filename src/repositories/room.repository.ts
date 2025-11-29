import Room, { IRoom } from "../models/room.model";

export class RoomRepository {
  getAllRooms(): Promise<IRoom[]> {
    return Room.find().sort({ floor: 1, indexOnFloor: 1 });
  }

  getAvailableRooms(): Promise<IRoom[]> {
    return Room.find({ occupied: false });
  }

  updateRooms(roomNos: number[]) {
    return Room.updateMany(
      { roomNo: { $in: roomNos } },
      { $set: { occupied: true } }
    );
  }

  resetRooms() {
    return Room.updateMany({}, { occupied: false });
  }

  randomizeOccupancy() {
    return Room.updateMany(
      {},
      [{ $set: { occupied: { $eq: [{ $mod: ["$roomNo", 2] }, 0] } } }],
      { updatePipeline: true }
    );
  }
}
