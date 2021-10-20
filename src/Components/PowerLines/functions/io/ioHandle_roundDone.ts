import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { GameStateInterface } from "../../PowerlinesInterfaces"


export function ioHandle_roundDone (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,

){
   

    socket.on("roundDone", (obj: any)=>{
        const temp = {
            player: obj.time,
            opponent: obj.opponentTime
        }
        //setTimeLastUpdated(Date.now())
        //setTime(temp)
        setGameState((prev)=>{
            return {
                ...prev, 
                time: temp, 
                toMove: false,
                timeLastUpdated: Date.now(),
            }
        })
        //setToMove(false)
    })

}



