import { Router, Request, Response } from "express";
import RoomController from "../controllers/RoomController";

const indexRouter = Router();
const roomController = RoomController.getRoomController();

indexRouter.get('/', async (req: Request, res: Response) => {
    const allRooms = roomController.listAllRooms();

    return res.json(allRooms);
});

export default indexRouter;