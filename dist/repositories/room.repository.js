"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRepository = void 0;
const room_model_1 = __importDefault(require("../models/room.model"));
class RoomRepository {
    getAllRooms() {
        return room_model_1.default.find().sort({ floor: 1, indexOnFloor: 1 });
    }
    getAvailableRooms() {
        return room_model_1.default.find({ occupied: false });
    }
    updateRooms(roomNos) {
        return room_model_1.default.updateMany({ roomNo: { $in: roomNos } }, { $set: { occupied: true } });
    }
    resetRooms() {
        return room_model_1.default.updateMany({}, { occupied: false });
    }
    randomizeOccupancy() {
        return room_model_1.default.updateMany({}, [{ $set: { occupied: { $eq: [{ $mod: ["$roomNo", 2] }, 0] } } }], { updatePipeline: true });
    }
}
exports.RoomRepository = RoomRepository;
