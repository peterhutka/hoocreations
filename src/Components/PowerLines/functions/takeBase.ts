import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { squareInterface } from "../../../Interfaces/Interfaces";
import { GameStateInterface } from "../PowerlinesInterfaces";

export function takeBase (
    yourPositionRef: React.MutableRefObject<number | null>,
    gridRef: React.MutableRefObject<squareInterface[] | null>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
    

){
    if(!gridRef.current ) return
    if(typeof yourPositionRef.current !== "number") return
    console.log("taking base")

    const pos = yourPositionRef.current
    if(gridRef.current[pos].type !== "B") {
        setMessage("You have to stand on Base to take it")
        return
    }
    
    // now we are sure we are on base, and this function only runs if we didnt move so far
    // so we can safely take base

    gridRef.current[pos].type = "Bp"
    
    //increaseTotal()
    //updateMovesLeft("baseTaken")
    setGameState((prev)=>{
        return {
            ...prev,
            movesLeft: prev.movesTotal,
            movesTotal: prev.movesTotal + 1
        }
    })
    socket.emit("takeBase")
    

}