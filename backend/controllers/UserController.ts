import { User } from "../types/User";
import { Room } from "../types/Room";

const users: User[] = [];

export default class UserController {
    private static _instance: UserController;

    private constructor() {}

    public static getUserController(){
        if(!this._instance)
            this._instance = new UserController;

        return this._instance;
    }

    public createNewUser(username: string){
        const id = users.length;

        const user: User = {
            id: id,
            score: 0,
            roomID: id,
            username
        }

        users.push(user);

        return user;
    }
} 
