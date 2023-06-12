import { Router } from "express";
import RoomController from "../controllers/RoomController";

const joinMatchRoute = Router();

joinMatchRoute.post('/join', RoomController.joinRoom);

export default joinMatchRoute;