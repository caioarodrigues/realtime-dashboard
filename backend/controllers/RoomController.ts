import RoomModel from "../models/RoomModel";
import UserModel from "../models/UserModel";
import TokenModel from "../models/TokenModel";
import { Request, Response } from "express";
import { FirstUser, GenericUser } from "../types/User";

const roomModel = RoomModel.getRoomModel();
const userModel = UserModel.getUserModel();
const tokenModel = TokenModel.getTokenModel();
export default class RoomController {
    public static async getAllRooms(req: Request, res: Response){
        const rooms = await roomModel.listAllRooms();

        return res.json(rooms);
    }
    public static async addNewRoom(req: Request, res: Response){
        const { username } = req.body;
        const user = await userModel.createNewUser(username);
        const token = await tokenModel.generate(user as GenericUser);
        const response = await roomModel.addNewRoom(user as FirstUser);
        
        return res.json({
            user,
            response,
            token,
        });
    }
    public static async editPonctuation(req: Request, res: Response){
        const { token, userID, roomID, operation } = req.body;
        const response = await roomModel.editPlayerPonctuation(token, userID, roomID, operation);
    
        return res.json(response);
    }
    public static async editRoom(req: Request, res: Response){

    }
    public static async joinRoom(req: Request, res: Response){
        const { id, username } = req.body;
        const response = await roomModel.joinRoom(id as number, username);
        const { success } = response;
        
        if(!success)
            return res.status(404).json(response);
    
        return res.json(response);
    }
    public static async removeRoom(req: Request, res: Response){
        const { id, token } = req.body;
        const response = await roomModel.removeRoom(id, token);
        const { success } = response;
    
        if(!success)
            return res.status(403).json(response);
        
        return res.json(response);
    }
}