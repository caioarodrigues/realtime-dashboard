import { Request, Response, Router } from "express";
import RoomController from "../controllers/RoomController";

const removeRoomRouter = Router();
const roomController = RoomController.getRoomController();

removeRoomRouter.delete('/remove', async (req: Request, res: Response) => {
    const { id, token } = req.body;
    const response = roomController.removeRoom(id, token);
    const { success } = response;

    if(!success)
        return res.status(403).json(response);
    
    return res.json(response);
})

export default removeRoomRouter;