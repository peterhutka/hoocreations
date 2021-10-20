import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { squareInterface } from "../../../../Interfaces/Interfaces"

export function ioHandle_alreadyMoved (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setMessage: React.Dispatch<React.SetStateAction<string>>


){
   

    socket.on("alreadyMoved", ()=>{
        setMessage("you cannot take base, this is kinda error lol")
    })

}



