import { OperationResponse } from "../types/Operation";
import { Room } from "../types/Room";
import { FirstUser, User } from "../types/User";

const rooms: Room[] = [];

export default class RoomController {
    private static _instance: RoomController;
    private constructor() {}

    public static getRoomController(){
        if(!this._instance)
            this._instance = new RoomController();
        
        return this._instance;
    }

    public joinRoom(id: Number, user: User){

    }
    public addNewRoom(firstUser: FirstUser) {
        const roomID = rooms.length;
        const thisRoom: Room = {
            id: roomID,
            users: [],
            admin: [{ ...firstUser, roomID }]
        }

        rooms.push(thisRoom);
    }
    public listAllRooms(): Room[] {
        return rooms;
    }
    public removeRoom(){}
    public editRoom(){}
}