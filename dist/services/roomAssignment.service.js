"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomAssignmentService = void 0;
const room_repository_1 = require("../repositories/room.repository");
const sameFloor_strategy_1 = require("./strategies/sameFloor.strategy");
const multiFloor_strategy_1 = require("./strategies/multiFloor.strategy");
class RoomAssignmentService {
    constructor() {
        this.repo = new room_repository_1.RoomRepository();
    }
    async assignRooms(count) {
        const available = await this.repo.getAvailableRooms();
        const sameFloor = new sameFloor_strategy_1.SameFloorStrategy().findRooms(available, count);
        if (sameFloor)
            return sameFloor;
        const multi = new multiFloor_strategy_1.MultiFloorStrategy().findRooms(available, count);
        return multi;
    }
}
exports.RoomAssignmentService = RoomAssignmentService;
