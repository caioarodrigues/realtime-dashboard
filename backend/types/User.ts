export type User = {
    username: string;
    score: number;
    roomID?: number | null;
    id: number;
}

export type GenericUser = Omit<User, "id">;
export type FirstUser = Omit<User, "roomID">;