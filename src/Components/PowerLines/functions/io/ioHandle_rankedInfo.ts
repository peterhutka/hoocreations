import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { GameStateInterface } from "../../PowerlinesInterfaces";

export default function ioHandle_rankedInfo(
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
){
    

    socket.on("rankedInfo", (data: any)=>{
        setGameState(prev=>{
        return {
            ...prev,
            ranked:  {
                isRanked: true,
                name:  data.name,
                elos: data.elos
        }

        }
    })
    })


    
}