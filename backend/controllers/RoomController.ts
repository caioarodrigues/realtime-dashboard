import { OperationResponse } from "../types/Operation";
import { Room } from "../types/Room";
import { FirstUser, User } from "../types/User";
import { Token } from "../types/Token";
import UserController from "./UserController";
import TokenController from "./TokenController";

const rooms: Room[] = [];
const userController = UserController.getUserController();
const tokenController = TokenController.getTokenController();
export default class RoomController {
    private static _instance: RoomController;
    private constructor() {}

    public static getRoomController(){
        if(!this._instance)
            this._instance = new RoomController();
        
        return this._instance;
    }

    public joinRoom(id: number, username: string): void {
        const thisUser = userController.createNewUser(username);
        const i = parseInt(id.toString());

        for(let j = 0; j < rooms.length; j++){
            const pivot = rooms.at(i)?.id;

            if(pivot === i){
                rooms.at(i)?.users.push(thisUser);

                break;
            }
        }
    }
    public addNewRoom(firstUser: FirstUser): void {
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
    public removeRoom(id: number, token: Token): OperationResponse {
        const { success } = tokenController.isValid(token);
        const data = tokenController.decrypt(token);

        console.log('success: ' + success);

        if(!data)
            return {
                message: "you cannot do this because you're not an admin!",
                success: false
            }
        
        if(!success)
            return {
                message: "your token is not valid!",
                success: false
            }

        if(id > rooms.length)
            return {
                message: "the id isn't valid",
                success: false 
            }

        try{
            const { username } = data;
            const admins = rooms[id]!.admin; 

            for(let adm of admins){
                if(adm.username === username){
                    rooms[id]!.admin = [];
                    rooms[id]!.users = [];

                    break;
                }
            }

            return { 
                message: "you successfully deleted the room",
                success: true
            }
        }
        catch(err){
            console.log("error whilst trying to remove the room. ", err);

            return {
                message: "error whilst trying to remove the room.",
                success: false
            }
        }
    }
    public editRoom(){}
}