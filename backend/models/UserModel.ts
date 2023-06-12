import { User } from "../types/User";
import { Room } from "../types/Room";

const users: User[] = [];

export default class UserModel {
    private static _instance: UserModel;

    private constructor() {}

    public static getUserController(){
        if(!this._instance)
            this._instance = new UserModel;

        return this._instance;
    }

    public static getUserModel() {
        return this.getUserController();
    }
    public createNewUser(username: string, roomID?: number){
        if(!roomID) roomID = users.length;
        const id = users.length;
        const user: User = {
            id: id,
            score: 0,
            roomID,
            username
        }

        users.push(user);
        
        return user;
    }
} 
