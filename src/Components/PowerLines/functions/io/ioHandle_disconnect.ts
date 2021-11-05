import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { squareInterface } from "../../../../Interfaces/Interfaces"
import { GameStateInterface } from "../../PowerlinesInterfaces"

export function ioHandle_disconnect (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
    


){
   

    socket.on("disconnect", ()=>{
        setGameState((prev)=>{
            return {
                ...prev,
                inLobby: false
            }
        })
    })

}



