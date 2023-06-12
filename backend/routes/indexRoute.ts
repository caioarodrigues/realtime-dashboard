import { Router } from "express";
import RoomController from "../controllers/RoomController";

const indexRouter = Router();

indexRouter.get('/', RoomController.getAllRooms);

export default indexRouter;