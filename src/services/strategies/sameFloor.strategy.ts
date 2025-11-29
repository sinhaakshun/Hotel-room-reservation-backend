import { BookingStrategy } from "./booking.strategy";
import { IRoom } from "../../models/room.model";

export class SameFloorStrategy implements BookingStrategy {
  findRooms(rooms: IRoom[], count: number) {
    const byFloor = new Map<number, IRoom[]>();

    rooms.forEach(r => {
      if (!byFloor.has(r.floor)) byFloor.set(r.floor, []);
      byFloor.get(r.floor)!.push(r);
    });

    let bestSet: IRoom[] | null = null;
    let bestTravel = Infinity;

    for (let [floor, floorRooms] of byFloor) {
      if (floorRooms.length < count) continue;

      // simply pick closest by index
      floorRooms.sort((a, b) => a.indexOnFloor - b.indexOnFloor);

      for (let i = 0; i <= floorRooms.length - count; i++) {
        const group = floorRooms.slice(i, i + count);

        const travel =
          group[group.length - 1].indexOnFloor - group[0].indexOnFloor;

        if (travel < bestTravel) {
          bestTravel = travel;
          bestSet = group;
        }
      }
    }

    return bestSet;
  }
}
