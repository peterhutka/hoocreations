import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { GameStateInterface } from "../../PowerlinesInterfaces"
import drawGrid from "../drawGrid"

export function ioHandle_roundStarts (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
    


){
    socket.on("roundStarts", (obj: any)=>{
//        setTimeLastUpdated(Date.now())
        /*setTime({
            player: obj.time,
            opponent: obj.opponentTime
        })*/
        setGameState((prev) => {
            return {
                ...prev, 
                time:{
                    player: Number(obj.time),
                    opponent: Number(obj.opponentTime)
                },
                toMove: true,
                timeLastUpdated: Date.now(),
                opponentsMovesLeft: obj.moves.opponent
        }})
        //setToMove(true)
        })

}




