import { RoomRepository } from "../repositories/room.repository";
import { SameFloorStrategy } from "./strategies/sameFloor.strategy";
import { MultiFloorStrategy } from "./strategies/multiFloor.strategy";

export class RoomAssignmentService {
  repo = new RoomRepository();

  async assignRooms(count: number) {
    const available = await this.repo.getAvailableRooms();

    const sameFloor = new SameFloorStrategy().findRooms(available, count);
    if (sameFloor) return sameFloor;

    const multi = new MultiFloorStrategy().findRooms(available, count);
    return multi;
  }
}
