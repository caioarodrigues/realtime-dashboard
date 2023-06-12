import { Router } from "express";
import RoomController from "../controllers/RoomController";

const editPonctuationRouter = Router();

editPonctuationRouter.put('/edit', RoomController.editPonctuation);

export default editPonctuationRouter;