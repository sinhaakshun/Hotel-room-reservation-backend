import { IRoom } from "../../models/room.model";

export interface BookingStrategy {
  findRooms(availableRooms: IRoom[], count: number): IRoom[] | null;
}
