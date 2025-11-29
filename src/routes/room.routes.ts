import { Router } from "express";
import { RoomController } from "../controllers/room.controller";

const router = Router();
const controller = new RoomController();

router.get("/", controller.getRooms);
router.post("/book", controller.book);
router.post("/reset", controller.reset);
router.post("/randomize", controller.randomize);

export default router;
