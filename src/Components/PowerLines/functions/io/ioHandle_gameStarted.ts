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
        //setGameStarted(true)
        /*setGameState(() => {
            return {
                ...gameState,
                gameStarted: true
            }
        })*/

        setGameState((prev) => {
            return {
                ...prev, 
                pwfInLobby: false, 
                gameStarted: true, 
                toMove: playerToMove,
                letter: (playerToMove ? "A" : "B"),
                timeLastUpdated: Date.now(),
                time: {
                    player: 20000,
                    opponent: 20000
                }
                
            }
        })
        //setPwfInLobby(false)
        //setToMove(playerToMove) 

        
        //setLetter(playerToMove ? "A" : "B")
        
    })
}



    