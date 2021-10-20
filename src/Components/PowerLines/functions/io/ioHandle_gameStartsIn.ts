import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { GameStateInterface } from "../../PowerlinesInterfaces"
import { initialGameState } from "../initialGameState"


export function ioHandle_gameStartsIn (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
){ 
    socket.on("gameStartsIn", (msg: any)=>{
            setMessage(`game STARTS in  ${msg.time}sec. ${msg.bool ? "Prepare first move 30s" : "Your opponent will open the game 30s" }`)
            setGameState((prev)=>{
                return initialGameState
            })
        })
}









