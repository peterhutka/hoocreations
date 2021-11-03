import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { squareInterface } from "../../../Interfaces/Interfaces"
import { GameStateInterface } from "../PowerlinesInterfaces"
import { handleHeadMove } from "./handleHeadMove"


//if sqare is available, executes handleHeadMove

export function checkSqareAndMove(yourPositionRef: React.MutableRefObject<number | null>,
    gridRef: React.MutableRefObject<squareInterface[] | null>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    positionChange: number,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
    
    
    )
{
    if(!yourPositionRef.current || !gridRef.current) return


        if(!gameState.toMove)return


        //check for border of map
        if(
            (gridRef.current[yourPositionRef.current].y === 0 && positionChange === -1) ||
            (gridRef.current[yourPositionRef.current].y === 35 && positionChange === 1) ||
            (gridRef.current[yourPositionRef.current].x === 0 && positionChange === -36) ||
            (gridRef.current[yourPositionRef.current].x === 35 && positionChange === 36) 
            ) {
            return
        }
        //check for wall or head 
        if(!checkSquareForWall( yourPositionRef.current + positionChange, gridRef)) return
        
        
        
        //updateMovesLeft("decrease")
        console.log("LEFT: ", gameState.movesLeft)
        if(gameState.movesLeft === 1){
            setGameState((prev)=>{
                return {
                    ...prev,
                    movesLeft: prev.movesTotal,
                    toMove: false
                }
            })
        } else {
            setGameState((prev)=>{
                return {
                    ...prev,
                    movesLeft: prev.movesLeft - 1
                }
            })
        }

        handleHeadMove( yourPositionRef, positionChange, gridRef, contextRef, gameState)
        socket.emit("move", positionChange)
        
        
        
}


export function checkSquareForWall( nextPos: number | null, gridRef: React.MutableRefObject<squareInterface[] | null>){
    if(!gridRef.current || typeof nextPos !== 'number') return    
    const newSqare = gridRef.current[nextPos]

    // if new sqare is occupied by wall or head of other player return false
    if((newSqare.isHead) || (newSqare.type === "W")){
        return false
    } 
    else {
        return true
    }
}