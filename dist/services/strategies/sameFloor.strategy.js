"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SameFloorStrategy = void 0;
class SameFloorStrategy {
    findRooms(rooms, count) {
        const byFloor = new Map();
        rooms.forEach(r => {
            if (!byFloor.has(r.floor))
                byFloor.set(r.floor, []);
            byFloor.get(r.floor).push(r);
        });
        let bestSet = null;
        let bestTravel = Infinity;
        for (let [floor, floorRooms] of byFloor) {
            if (floorRooms.length < count)
                continue;
            // simply pick closest by index
            floorRooms.sort((a, b) => a.indexOnFloor - b.indexOnFloor);
            for (let i = 0; i <= floorRooms.length - count; i++) {
                const group = floorRooms.slice(i, i + count);
                const travel = group[group.length - 1].indexOnFloor - group[0].indexOnFloor;
                if (travel < bestTravel) {
                    bestTravel = travel;
                    bestSet = group;
                }
            }
        }
        return bestSet;
    }
}
exports.SameFloorStrategy = SameFloorStrategy;
