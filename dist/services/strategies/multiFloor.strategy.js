"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiFloorStrategy = void 0;
class MultiFloorStrategy {
    findRooms(rooms, count) {
        rooms.sort((a, b) => a.floor - b.floor || a.indexOnFloor - b.indexOnFloor);
        let best = null;
        let bestTravel = Infinity;
        function calcTravel(group) {
            const floors = group.map(r => r.floor);
            const indices = group.map(r => r.indexOnFloor);
            const v = (Math.max(...floors) - Math.min(...floors)) * 2;
            const h = Math.max(...indices) - Math.min(...indices);
            return v + h;
        }
        function backtrack(start, picked) {
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
exports.MultiFloorStrategy = MultiFloorStrategy;
