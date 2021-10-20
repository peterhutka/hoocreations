import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { squareInterface } from "../../../Interfaces/Interfaces"
import { GameStateInterface } from "../PowerlinesInterfaces"
import { checkSqareAndMove } from "./checkSquares"
import { stopMove } from "./stopMove"
import { takeBase } from "./takeBase"

export function handleKeyDown (
    e: React.KeyboardEvent<HTMLCanvasElement>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    gridRef: React.MutableRefObject<squareInterface[] | null>,
    yourPositionRef: React.MutableRefObject<number | null>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    //todo boolean?
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
    

)
{
    e.preventDefault()

    if(!gameState.letter) return

    if(gameState.hintNumber === 0){
        setGameState((prev)=>{
            return{
                ...prev,
                hintNumber: 1
            }
        })
    }

    if(gameState.hintNumber === 2 && e.code === "Space" ){
        setGameState((prev)=>{
            return{
                ...prev,
                hintNumber: 3
            }
        })
    }

    if(gameState.hintNumber === 3 && e.code === "KeyQ" ){
        setGameState((prev)=>{
            return{
                ...prev,
                hintNumber: 4
            }
        })
    }

    

    if(e.code === "KeyW") {
        checkSqareAndMove(yourPositionRef, gridRef, socket, - 1, contextRef, gameState, setGameState)
    } else if(e.code === "KeyS") {
       checkSqareAndMove(yourPositionRef, gridRef, socket, 1, contextRef, gameState, setGameState)
    } else if(e.code === "KeyA") {
        checkSqareAndMove(yourPositionRef, gridRef, socket, - 36, contextRef, gameState, setGameState)
    } else if(e.code === "KeyD") {
        checkSqareAndMove(yourPositionRef, gridRef, socket, 36, contextRef, gameState, setGameState)
    } else if(e.code === "Space" ) {
        (gameState.movesLeft === gameState.movesTotal) ? 
            takeBase(yourPositionRef, gridRef, socket, contextRef, setMessage, gameState, setGameState) 
            : setMessage("You can only take base if you didnt move")
    } else if(e.code === "KeyQ") {
        stopMove(socket, gameState, setGameState )
    }
}