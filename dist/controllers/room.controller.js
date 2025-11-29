"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const room_repository_1 = require("../repositories/room.repository");
const roomAssignment_service_1 = require("../services/roomAssignment.service");
const repo = new room_repository_1.RoomRepository();
const service = new roomAssignment_service_1.RoomAssignmentService();
class RoomController {
    async getRooms(req, res) {
        res.json(await repo.getAllRooms());
    }
    async book(req, res) {
        const { count } = req.body;
        if (!count || count < 1 || count > 5)
            return res.status(400).send("count must be 1-5");
        const rooms = await service.assignRooms(count);
        if (!rooms)
            return res.status(400).send("No suitable rooms found");
        await repo.updateRooms(rooms.map(r => r.roomNo));
        res.json({ booked: rooms });
    }
    async reset(req, res) {
        await repo.resetRooms();
        res.send("Reset complete");
    }
    async randomize(req, res) {
        await repo.randomizeOccupancy();
        res.send("Randomized");
    }
}
exports.RoomController = RoomController;
