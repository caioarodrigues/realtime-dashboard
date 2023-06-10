import { OperationResponse } from "../types/Operation";
import { Room } from "../types/Room";
import { FirstUser, User } from "../types/User";
import { Token } from "../types/Token";
import UserController from "./UserController";
import TokenController from "./TokenController";
import log from "../decorators/log";
import { PlayerOperations } from "../enums/PlayerOperations";

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

    private isAdmin(token: Token) {
        const decrypted = tokenController.decrypt(token);
        const obj = decrypted || {};


    }
    public joinRoom(id: number, username: string): OperationResponse {
        const thisUser = userController.createNewUser(username);
        const i = parseInt(id.toString());

        for(let j = 0; j < rooms.length; j++){
            const pivot = rooms.at(i)?.id;

            if(pivot === i){
                rooms.at(i)?.users.push(thisUser);

                return {
                    message: `you just got in the room ${id}`,
                    success: true
                }
            }
        }

        return {
            message: "this room doesn't exist!",
            success: false
        }
    }
    public addNewRoom(firstUser: FirstUser): OperationResponse {
        const roomID = rooms.length;
        const thisRoom: Room = {
            id: roomID,
            users: [],
            admin: [{ ...firstUser, roomID }]
        }

        rooms.push(thisRoom);

        return {
            message: "a new room just got created",
            success: true
        }
    }
    
    @log
    public listAllRooms(): Room[] {
        return rooms;
    }
    public removeRoom(id: number, token: Token): OperationResponse {
        const { success } = tokenController.isValid(token);
        const data = tokenController.decrypt(token);

        console.log(`${success}, ${JSON.stringify(data)}`);

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
            const { username, id: index } = data;
            const admins = rooms[id]!.admin; 

            for(let adm of admins){
                if(adm.username === username && index === adm.id){
                    rooms[id]!.admin = [];
                    rooms[id]!.users = [];

                    return { 
                        message: "you successfully deleted the room",
                        success: true
                    }
                }
            }

            return {
                message: "you're not admin of the room",
                success: false
            }
        }
        catch(err: unknown){
            console.log("error whilst trying to remove the room. ", err);

            return {
                message: "error whilst trying to remove the room.",
                success: false
            }
        }
    }
    public editPlayerPonctuation(token: Token, userID: number, operation: PlayerOperations): OperationResponse {
        const isValid = tokenController.isValid(token);
        if(!isValid)
            return { message: "this token isn't valid!", success: false }
        
        return { message: "", success: false }
    }
    public editRoom(){}
}