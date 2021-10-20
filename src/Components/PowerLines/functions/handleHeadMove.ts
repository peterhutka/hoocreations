import { squareInterface } from "../../../Interfaces/Interfaces";
import { GameStateInterface } from "../PowerlinesInterfaces";
import drawGrid, { createRGBA } from "./drawGrid";

export function handleHeadMove (
    yourPositionRef: React.MutableRefObject<number | null>,
    positionChange: number,
    gridRef: React.MutableRefObject<squareInterface[] | null>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    gameState: GameStateInterface,
) {
    let newHeadSqare;
    let oldLetter: "A"|"B"|null = null;
    if(gridRef.current && yourPositionRef.current){
        oldLetter = gridRef.current[yourPositionRef.current].player
    }
    
    let roadIdx = positionChange === -1 ? 0 : positionChange === 36 ? 1 : positionChange === 1 ? 2 : 3
    let newSqRoadIdx = positionChange === -1 ? 2 : positionChange === 36 ? 3 : positionChange === 1 ? 0 : 1
    if(gridRef.current && yourPositionRef.current){
        newHeadSqare = gridRef.current[yourPositionRef.current + positionChange]
        gridRef.current[yourPositionRef.current].roads[roadIdx] = true
        gridRef.current[yourPositionRef.current + positionChange].roads[newSqRoadIdx] = true
    }
    let x;
    let y;
    if(newHeadSqare) {
        x = newHeadSqare.x;
        y = newHeadSqare.y

        if(contextRef.current){
            contextRef.current.beginPath();
            contextRef.current.lineWidth = 2;
            //W,E,B
            contextRef.current.strokeStyle = createRGBA(0,220,0) 
            contextRef.current.fillStyle = createRGBA(0,220,0) 
          
            contextRef.current.rect(x*20 + 5, y*20 + 5, 10, 10);
            contextRef.current.stroke();
            contextRef.current.fill()  
        } 
    }
    
    if(yourPositionRef.current && gridRef.current){
        gridRef.current[yourPositionRef.current].isHead = false
        gridRef.current[yourPositionRef.current + positionChange].player = oldLetter;
        gridRef.current[yourPositionRef.current + positionChange].isHead = true
        yourPositionRef.current += positionChange;
        drawGrid(gridRef.current, contextRef.current, gameState)
    }
    
    


    
}