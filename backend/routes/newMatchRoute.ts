import { Router, Request, Response } from "express";
import TokenController from "../controllers/TokenController";
import UserController from "../controllers/UserController";
import { FirstUser, GenericUser } from "../types/User";
import { OperationResponse } from "../types/Operation";
import RoomController from "../controllers/RoomController";

const newMatchRouter = Router();
const tokenController = TokenController.getTokenController();
const userController = UserController.getUserController();
const roomController = RoomController.getRoomController();

newMatchRouter.post('/new', async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = userController.createNewUser(username);
    const token = tokenController.generate(user as GenericUser);
    const response: OperationResponse = {
        message: "new user created",
        success: true
    }

    roomController.addNewRoom(user as FirstUser);
    
    return res.json({
        user,
        response,
        token,
    });
})

export default newMatchRouter;