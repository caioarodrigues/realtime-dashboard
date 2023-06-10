import { Router, Request, Response } from "express";
import { PlayerOperations } from "../enums/PlayerOperations";
import RoomController from "../controllers/RoomController";

const editPonctuationRouter = Router();
const roomController = RoomController.getRoomController();

editPonctuationRouter.put('/edit', async (req: Request, res: Response) => {
    const { token, userID, operation } = req.body;
    

});

export default editPonctuationRouter;