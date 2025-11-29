import { BookingStrategy } from "./booking.strategy";
import { IRoom } from "../../models/room.model";

export class MultiFloorStrategy implements BookingStrategy {
  findRooms(rooms: IRoom[], count: number) {

    rooms.sort((a,b) => a.floor - b.floor || a.indexOnFloor - b.indexOnFloor);

    let best: IRoom[] | null = null;
    let bestTravel = Infinity;

    function calcTravel(group: IRoom[]) {
      const floors = group.map(r => r.floor);
      const indices = group.map(r => r.indexOnFloor);

      const v = (Math.max(...floors) - Math.min(...floors)) * 2;
      const h = Math.max(...indices) - Math.min(...indices);

      return v + h;
    }

    function backtrack(start: number, picked: IRoom[]) {
      if (picked.length === count) {
        const travel = calcTravel(picked);
        if (travel < bestTravel) {
          bestTravel = travel;
          best = [...picked];
        }
        return;
      }

      for (let i = start; i < rooms.length; i++) {
        picked.push(rooms[i]);
        backtrack(i + 1, picked);
        picked.pop();
      }
    }

    backtrack(0, []);

    return best;
  }
}
