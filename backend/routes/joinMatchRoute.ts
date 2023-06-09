import { Router, Request, Response } from "express";
import RoomController from "../controllers/RoomController";
import { OperationResponse } from "../types/Operation";

const joinMatchRoute = Router();
const roomController = RoomController.getRoomController();

joinMatchRoute.post('/join', async (req: Request, res: Response) => {
    const { id, username } = req.body;
    const defaultResponse: OperationResponse = {
        message: `you just got in the room #${id}!`,
        success: true
    }

    roomController.joinRoom(id as number, username);

    return res.json(defaultResponse);
});

export default joinMatchRoute;