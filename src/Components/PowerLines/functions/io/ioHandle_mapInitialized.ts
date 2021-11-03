import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { squareInterface } from "../../../../Interfaces/Interfaces"
import { GameStateInterface } from "../../PowerlinesInterfaces"
import drawGrid from "../drawGrid"


export function ioHandle_mapInitialized (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    gridRef: React.MutableRefObject<squareInterface[] | null>,
    yourPositionRef: React.MutableRefObject<number | null>,
    gameState: GameStateInterface

){
    
    socket.on("mapInitialized", ({grid, info}: any)=>{
        drawGrid(grid, contextRef.current, gameState)
        gridRef.current = grid
        if(gridRef.current){
            gridRef.current.forEach(item =>{
                if(item.player === info.player){
                    yourPositionRef.current = item.y + item.x * 36
                }
            })
        }
    })

}








