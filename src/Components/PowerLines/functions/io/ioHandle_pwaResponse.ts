import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"


export function ioHandle_pwaResponse (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
){
    socket.on("pwaResponse", (msg:any)=>{
        console.log("REF WORKS ----------------")
        if (msg === "queued"){
            setMessage("U have been queed successfully")
        } else if (msg === "occupied"){
            setMessage( (message)=> {
                return message + "... You are alredy playing or in Queue"
            })
        } 
    })
}