import { Router, Request, Response } from "express";
import RoomController from "../controllers/RoomController";
import { OperationResponse } from "../types/Operation";

const joinMatchRoute = Router();
const roomController = RoomController.getRoomController();

joinMatchRoute.post('/join', async (req: Request, res: Response) => {
    const { id, username } = req.body;
    const response = roomController.joinRoom(id as number, username);
    const { success } = response;
    
    if(!success)
        return res.status(404).json(response);

    return res.json(response);
});

export default joinMatchRoute;