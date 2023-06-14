import { OperationResponse } from "../types/Operation";
import { Room } from "../types/Room";
import { FirstUser, User } from "../types/User";
import { Token } from "../types/Token";
import UserModel from "./UserModel";
import TokenModel from "./TokenModel";
import log from "../decorators/log";
import { PlayerOperations } from "../enums/PlayerOperations";
import TokenController from "../controllers/TokenController";

const rooms: Room[] = [];
const userController = UserModel.getUserController();
export default class RoomModel {
    private static _instance: RoomModel;
    private constructor() {}

    public static getRoomModel(){
        if(!this._instance)
            this._instance = new RoomModel();
        
        return this._instance;
    }
    private async changePonctuation(id: number, operation: PlayerOperations): Promise<OperationResponse>{
        throw new Error("fail, not implemented yet!");
    }
    private async isAdmin(token: Token): Promise<boolean> {
        const decrypted = await TokenController.decrypt(token);
        const { id: userID } = decrypted!;
        const adminsIDs = rooms.map((room, i) => {
            if(!room || !room.admin)
                return null;

            const { id } = room.admin[i];

            return id;
        });

        return adminsIDs.some(adm => adm === userID);
    }
    public async getRoom(id: number): Promise<Room>{
        if(id > rooms.length)
            return null;
        
        return rooms[id];
    }
    public async joinRoom(id: number, username: string): Promise<OperationResponse> {
        const thisUser = userController.createNewUser(username, id);
        const i = parseInt(id.toString());

        for(let j = 0; j < rooms.length; j++){
            const pivot = rooms.at(i)?.id;

            if(pivot === i){
                const thisUsers = rooms.at(i)!.users;
                const hasAdmin = rooms.at(i)!.admin.length > 0;
                const isRepeated = thisUsers.some(({ username: _ }) => {
                    return _ === username;
                })

                if(!hasAdmin){
                    return {
                        message: "this room has no admin!",
                        success: false
                    }
                }
                if(!isRepeated){
                    thisUsers.push(thisUser);

                    return {
                        message: `you just got in the room ${id}`,
                        success: true
                    }
                }
                else {
                    return {
                        message: "this username already exists!",
                        success: false 
                    }
                }
            }
        }
        return {
            message: "this room doesn't exist!",
            success: false
        }
    }
    public async addNewRoom(firstUser: FirstUser): Promise<OperationResponse> {
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
    public async listAllRooms(): Promise<Room[]> {
        return rooms;
    }
    public async removeRoom(id: number, token: Token): Promise<OperationResponse> {
        const { success } = await TokenController.isValid(token);
        const data = await TokenController.decrypt(token);

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
    public async editPlayerPonctuation(token: Token, userID: number, roomID: number, operation: PlayerOperations): Promise<OperationResponse> {
        let wasFound: boolean = false;

        if(!(await TokenController.isValid(token))){
            return { message: "this token isn't valid!", success: false }
        }
        if(!(await this.isAdmin(token))){
            return {
                message: "you cannot do this because you're not an admin!",
                success: false
            }
        }
        if(roomID > rooms.length){
            return {
                message: "the index is invalid!",
                success: false
            }
        }

        for(let room of rooms){
            if(!room?.admin && !room?.users){
                continue;
            }
            if (room.admin && room.users){
                const { id, admin, users } = room;

                if(id !== roomID)
                    continue;
                    
                    admin.forEach((adm, index, array) => {
                        const { id } = adm;
                        
                        if(wasFound)
                            return;
                        if(id === userID){
                            array[index].score = 10;
                            wasFound = true;
                        }
                    });

                    if(wasFound)
                        break;

                    users.forEach((user, index, array) => {
                        const { id } = user;

                        if(wasFound)
                            return;
                        if(id === userID){
                            array[index].score = 10;
                            wasFound = true;
                        }
                    });
            }
        }
        
        if(wasFound){
            return { message: "the ponctuation was edited", success: true };
        }

        rooms[roomID]?.users.forEach(u => {
            const { id } = u;

            if(wasFound) return;

            if(id === userID){
                u.score++;
                wasFound = true;
            }
        })
        console.log(`edit: ${roomID}`);

        if(!wasFound){
            return { message: "user not found", success: false };
        }

        return { message: "the ponctuation was edited", success: true };
    }
    public async editRoom(){}
}