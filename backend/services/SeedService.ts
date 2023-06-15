import UserModel from "../models/UserModel";
import RoomModel from "../models/RoomModel";
import { FirstUser } from "../types/User";

const userModel = UserModel.getUserModel();
const roomModel = RoomModel.getRoomModel();

const admins: FirstUser[] = [
    { id: 0, score: 2, username: "Raimundo" },
    { id: 1, score: 5, username: "José" },
    { id: 2, score: 0, username: "João" },
    { id: 3, score: 4, username: "Donizete" },
    { id: 4, score: 55, username: "Maria" },
];

const users: { username: string, roomID: number }[] = [
    { username: "__user", roomID: 0 },
    { username: "_user", roomID: 0 },
    { username: "_user", roomID: 1 },
    { username: "user", roomID: 2 },
    { username: "user_", roomID: 2 },
    { username: "user__", roomID: 2 },
    { username: "_user_", roomID: 3 },
    { username: "__user_", roomID: 3 },
    { username: "__user__", roomID: 4 },
    { username: "u", roomID: 4 },
    { username: "us", roomID: 4 },
    { username: "use", roomID: 4 },
    { username: "user", roomID: 4 },
]

export default class SeedService {
    public static feed(): void{
        admins.forEach(roomModel.addNewRoom);
        users.forEach(({ username, roomID }) => {
            roomModel.joinRoom(roomID, username);
        });
    }
}