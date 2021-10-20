import { squareInterface } from "../../../Interfaces/Interfaces";
import { GameStateInterface } from "../PowerlinesInterfaces";
import { chooseColor, createRGBA } from "./drawGrid";

export function drawEffectsGrid(
    grid: squareInterface[], 
    context: CanvasRenderingContext2D | null | undefined,
    yourPositionRef: React.MutableRefObject<number | null>,
    gameState: GameStateInterface,
){
    if(!context) return

    const t0 = performance.now();

    let opponentPos: number|null = null;

    for(const square of grid){
        if(square.isHead === true && square.player !== gameState.letter){
            opponentPos = square.x*36+square.y
            break
        }
    }
    
    if(!yourPositionRef.current || !opponentPos)return 

    context.clearRect(0, 0, 720, 720)


    let protagonistMoves = getMoves(yourPositionRef.current, gameState.movesLeft, grid)
    let antagonistMove = getMoves(opponentPos, gameState.opponentsMovesLeft, grid)

    protagonistMoves.forEach((square)=>{
        const index = antagonistMove.indexOf(square)
        if(index === -1){
            drawGuide("protagonist", square, context)
            
        } else {
            drawGuide("common", square, context)
            antagonistMove.splice(index, 1)
        }
    })
    antagonistMove.forEach((square)=>{
        drawGuide("antagonist", square, context)
    })
}

function drawGuide(player: string, index:number, context: CanvasRenderingContext2D){
    const x = Math.floor(index/36)
    const y = index % 36

    let fillStyle: string = "";
    if(player === "protagonist"){
        fillStyle = createRGBA(51, 153, 137, 0.3)
    } else if(player === "antagonist"){
        fillStyle = createRGBA(249, 110, 70, 0.3)            
    } else if(player === "common"){
        fillStyle = createRGBA(220, 224, 239, 0.4)  
    }



    
    context.beginPath();
    context.lineWidth = 0;
    //W,E,B
    context.fillStyle = fillStyle
    context.rect(x*20, y*20, 20, 20);
    //context.stroke();
    context.fill()   
}

function getMoves(
    pos: number,
    movesLeft: number,
    grid: squareInterface[]

){
    let tempArr = []
    tempArr[pos] = movesLeft

    let checkNext = [pos]

    

    while(checkNext.length > 0){
        const nextPos = checkNext[0]
        checkNext.splice(0,1)
        if(tempArr[nextPos] < 1){
            continue
        }
        
        // UP
        if(grid[nextPos].y > 0  && !grid[nextPos-1].isHead && grid[nextPos-1].type !== "W") {
            if(tempArr[nextPos-1] === undefined ){
                tempArr[nextPos-1] = tempArr[nextPos] - 1
                checkNext.push(nextPos - 1)
            } 
        }

        //RIGHT
        if(grid[nextPos].x < 35  && !grid[nextPos+36].isHead && grid[nextPos+36].type !== "W") {
             if(tempArr[nextPos+36] === undefined ){                 
                tempArr[nextPos+36] = tempArr[nextPos] - 1
                checkNext.push(nextPos + 36)
             }
        }

        //DOWN
        if(grid[nextPos].y < 35  && !grid[nextPos+1].isHead && grid[nextPos+1].type !== "W") {
             if(tempArr[nextPos+1] === undefined ){
                checkNext.push(nextPos + 1)
                tempArr[nextPos+1] = tempArr[nextPos] - 1
             }
        }

        //LEFT
        if(grid[nextPos].x > 0  && !grid[nextPos-36].isHead && grid[nextPos-36].type !== "W") {
             if(tempArr[nextPos-36] === undefined ){
                 checkNext.push(nextPos - 36)
                 tempArr[nextPos-36] = tempArr[nextPos] - 1
             }
        }


        
        
        
    }
    

    
    const newArr = [];
    for(const index in tempArr)
    {
        if(tempArr[index] !== undefined){
            newArr.push(Number(index))
        }
        
    }
    return newArr
}

