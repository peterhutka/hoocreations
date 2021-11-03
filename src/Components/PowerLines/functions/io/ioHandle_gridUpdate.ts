import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { squareInterface } from "../../../../Interfaces/Interfaces"
import { GameStateInterface } from "../../PowerlinesInterfaces"
import { drawEffectsGrid } from "../drawEffectsGrid"
import drawGrid from "../drawGrid"

export function ioHandle_gridUpdate (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    gridRef: React.MutableRefObject<squareInterface[] | null>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    yourPositionRef: React.MutableRefObject<number | null>,
    updatePosition: (pos: number) => void,
    contextEffectsRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
    

){
    socket.on("gridUpdate", (data: any)=>{
        updateGrid(data, false) 
        //setOnBase(data.grid[data.position].type === "B")
        setGameState((prev)=>{
            return{
                ...prev,
                movesLeft: data.movesLeft,
                onBase: (data.grid[data.position].type === "B"),
            }
        })
    })

    socket.on("finalGridUpdate", (data: any)=>{
        updateGrid(data, true)  
    })


    function updateGrid(data: any, final: boolean){
        let {movesLeft, toMove, opponentsMovesLeft} = gameState
        if(final){
            toMove = false
            movesLeft = 0
            opponentsMovesLeft = 0 
        }

        gridRef.current = data.grid
        updatePosition(data.position)
        
        //setMovesTotal((prev)=> data.bases)
        setGameState((prev)=>{
            return {
                ...prev,
                movesTotal: data.bases,
                opponentsMovesLeft: data.opponentMovesLeft
            }
        })

        
        if(gridRef.current && contextRef.current){
            drawGrid(gridRef.current, contextRef.current, gameState)
            if(final){
                drawEffectsGrid(gridRef.current, contextEffectsRef.current, yourPositionRef, gameState,)
                //setMovesTotal((prev)=> 0)
                setGameState((prev)=>{
                    return {
                        ...prev,
                        movesTotal: 0,
                        opponentsMovesLeft: 0
                    }
                })
            }
        } 
    }
    

}






  