import { squareInterface } from "../../../Interfaces/Interfaces";
import { GameStateInterface } from "../PowerlinesInterfaces";

export default function drawGrid (
    grid: squareInterface[], 
    context: CanvasRenderingContext2D | null | undefined,
    gameState: GameStateInterface,
    
    )
{
    
    // to make typescript happy
    if(!context) return
    if(!gameState.letter) return
    
    const t0 = performance.now();

    
    let index = 0;

    grid.forEach(square =>{
        const {x, y, type, player, roads, isHead} = square
    
        context.beginPath();
        context.lineWidth = 2;
        //W,E,B
        chooseColor(context, type, player, gameState.letter)
        if(player){
            //context.strokeStyle = createRGBA(140,140,160)
            //context.fillStyle = createRGBA(220, 224, 239)
            context.rect(x*20, y*20, 20, 20);
            context.stroke();
            context.fill()   
            context.beginPath();
            chooseColor(context, type, player, gameState.letter)
            context.rect(x*20+4, y*20+4, 12, 12);
            context.stroke();
            context.fill()   
        } else {
            context.rect(x*20, y*20, 20, 20);
            context.stroke();
            context.fill()   
        }
        
        

        for(let i in roads){
            let coordinates = [0,0]
            if(roads[i]){
                if(i == "0"){
                    coordinates = [10,0]
                } else if( i == "1"){
                    coordinates = [20,10]
                }else if( i == "2"){
                    coordinates = [10,20]
                }else if( i == "3"){
                    coordinates = [0,10]
                }
                if(player === gameState.letter){
                context.strokeStyle = createRGBA(25,100,25)
                } else {
                context.strokeStyle = createRGBA(100,25,25)
                }

                context.beginPath();
                context.moveTo(x*20 + 10, y*20 + 10);
                context.lineTo(x*20 + coordinates[0], y*20+ coordinates[1] );
                //context.strokeStyle = createRGBA(25,25,25)
                context.stroke();
            }
        }

        if(type === "Bp"){
            context.strokeStyle = createRGBA(20, 26, 46)
            

            context.beginPath();
            context.moveTo(x*20 , y*20+5);
            context.lineTo(x*20 + 20, y*20+5 );
            context.stroke();

            context.beginPath();
            context.moveTo(x*20 , y*20+10);
            context.lineTo(x*20 + 20, y*20+10 );
            context.stroke();

            context.beginPath();
            context.moveTo(x*20 , y*20+15);
            context.lineTo(x*20 + 20, y*20+15 );
            context.stroke();

           
        }

        if(type === "B"){
            //context.strokeStyle = createRGBA(25,25,25)
            context.strokeStyle = createRGBA(20, 26, 46)

            context.beginPath();
            context.moveTo(x*20 , y*20);
            context.lineTo(x*20 + 20, y*20+ 20 );
            context.stroke();

            context.beginPath();
            context.moveTo(x*20 +20 , y*20);
            context.lineTo(x*20, y*20+ 20 );
            context.stroke();

            
        }
        if(isHead ){
            (gameState.toMove && gameState.letter === player) ? (context.fillStyle = "rgba(250,250, 250, 1)") : (context.fillStyle = "rgba(25,25, 25, 1)")


            context.rect(x*20 +5, y*20+5, 10, 10);
            context.stroke();
            context.fill()
        }





        /*
        context.font = "8px Arial";
        context.fillStyle = "rgba(180, 50, 50, 1)";
        context.textAlign = "left";
        context.fillText(`${index}`, x*20 +2 , y*20 + 10);
        index++*/









    })
    
    const t1 = performance.now();
    //console.log(`Drawing grid took ${t1 - t0} milliseconds.`);
}
/*
function drawBackGround(context: CanvasRenderingContext2D){
        context.beginPath();
        context.lineWidth = 2;
        chooseColor(context, type)
        context.rect(x*10, y*10, 8, 8);
        context.stroke();
        context.fill()
    
        
}*/
/*
  --primary-bg-color: #0b0e19;
  --primary-text-color: #dce0ef;
  --light-bg-color: #141a2e;
  --accent-A: #339989;
  --accent-B: #f96e46;

*/
export function chooseColor(
    context: CanvasRenderingContext2D, 
    type: "W" | "E" | "B"| "Bp", 
    sqPlayer: null | "A" | "B", 
    clientPlayer: null|string
    ){
    const protagonistCol = createRGBA(51, 153, 137)
    const antagonistCol = createRGBA(249, 110, 70)
    
    if(sqPlayer === clientPlayer){
        context.strokeStyle = protagonistCol
        context.fillStyle = protagonistCol
        return
    }
    if(sqPlayer){
        context.strokeStyle = antagonistCol
        context.fillStyle = antagonistCol 
        return
    }
    if(type === "W"){
        context.strokeStyle = createRGBA(20, 26, 46) 
        context.fillStyle = createRGBA(20, 26, 46)

    } else if (type === "B") {
        context.strokeStyle = createRGBA(20, 26, 46) 
        context.fillStyle = createRGBA(220, 224, 239)

    } else if (type === "E"){
        context.strokeStyle = createRGBA(20, 26, 46)
        context.fillStyle = createRGBA(220, 224, 239)
    } 
}

export function createRGBA(r: number, g: number, b: number, a: number = 1){
    return `rgba(${r},${g},${b},${a})`
}