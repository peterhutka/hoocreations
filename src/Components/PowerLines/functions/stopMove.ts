import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { convertTypeAcquisitionFromJson } from "typescript";
import { GameStateInterface } from "../PowerlinesInterfaces";

export function stopMove(
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
    
){
    if(gameState.movesLeft < gameState.movesTotal){
        socket.emit("stopMove")
        
        //updateMovesLeft("reset")
        
        setGameState((prev)=>{
            return {
                ...prev,
                movesLeft: prev.movesTotal
            }
        })
        
    } else {
        //console.log("Q cannot be pressed, left/total: ", movesLeft, movesTotal)
    }
}