import { Request, Response } from "express";
import { RoomRepository } from "../repositories/room.repository";
import { RoomAssignmentService } from "../services/roomAssignment.service";

const repo = new RoomRepository();
const service = new RoomAssignmentService();

export class RoomController {

  async getRooms(req: Request, res: Response) {
    res.json(await repo.getAllRooms());
  }

  async book(req: Request, res: Response) {
    const { count } = req.body;
    if (!count || count < 1 || count > 5)
      return res.status(400).send("count must be 1-5");

    const rooms = await service.assignRooms(count);
    if (!rooms) return res.status(400).send("No suitable rooms found");

    await repo.updateRooms(rooms.map(r => r.roomNo));
    res.json({ booked: rooms });
  }

  async reset(req: Request, res: Response) {
    await repo.resetRooms();
    res.send("Reset complete");
  }

  async randomize(req: Request, res: Response) {
    await repo.randomizeOccupancy();
    res.send("Randomized");
  }
}
