import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { GameStateInterface } from "../../PowerlinesInterfaces"


export function ioHandle_endgame (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
){
   

    socket.on("endgame", (msg: any)=>{
        console.log("ENDGAME")
        if(msg === "L"){
            setMessage("Opponent destroyed you")
        } else if (msg === "W"){
            setMessage("Your opponent is destroyed")
        }else if (msg === "T"){
            setMessage("Its Tie, your opponent probly disconected")
        } else{
            setMessage(msg)
        }
        //setGameStarted(false)
        setGameState((prev)=>{
            return {
                ...prev,
                gameStarted: false
            }
        })
        
    })

}



