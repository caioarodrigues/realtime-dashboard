import { User } from "./User"

export type Room = { 
    id: number;
    users: User [];
    admin: User [];
} | null