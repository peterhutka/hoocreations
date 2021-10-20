import { SocketOptions } from "dgram";
import { ManagerOptions, Socket } from "socket.io-client";
import { squareInterface } from "../../../Interfaces/Interfaces";
import drawGrid from "./drawGrid";

export function ioSetup(
    io: (uri: string, opts?: Partial<ManagerOptions & SocketOptions>)=> Socket, //(+2 overloads),  
){
    let socket = io("http://localhost:8080", {
            transports: ['websocket'],
            withCredentials: true,
        });

        return socket
}