import { Router } from "express";
import RoomController from "../controllers/RoomController";

const newMatchRouter = Router();

newMatchRouter.post('/new', RoomController.addNewRoom);

export default newMatchRouter;