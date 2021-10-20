import { Dispatch, SetStateAction } from "react";

export interface UserInterface {
    id: string,
    username: string,
    isAdmin: Boolean
}

export interface ContextUserInterface  {
    user: UserInterface;
    updateUser: any;
}



export interface squareInterface {
    x: number;
    y: number;
    type: "W" | "E" | "B" | "Bp";
    roads: boolean[];
    player: null | 'A' | "B";
    isHead: boolean
}