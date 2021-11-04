import { Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import { GameStateInterface } from "../../PowerlinesInterfaces"


export function ioHandle_gameStarted (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
   
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
){
    

   socket.on("gameStarted", (playerToMove: boolean)=>{
        setMessage(`${playerToMove ? ("Your Move 30s/30s") : "Wait for Opponent 30s" }`)

        setGameState((prev) => {
            return {
                ...prev, 
                pwfInLobby: false, 
                gameStarted: true, 
                toMove: playerToMove,
                letter: (playerToMove ? "A" : "B"),
                timeLastUpdated: Date.now(),
                time: {
                    player: 30000,
                    opponent: 30000
                }
            }
        })        
    })
}



    