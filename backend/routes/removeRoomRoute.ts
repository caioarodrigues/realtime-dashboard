import { Router } from "express";
import RoomController from "../controllers/RoomController";

const removeRoomRouter = Router();

removeRoomRouter.delete('/remove', RoomController.removeRoom);

export default removeRoomRouter;