import { GameStateInterface } from "../PowerlinesInterfaces"

export function handlePlayWithAnybody(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    socketRef: React.MutableRefObject<any>,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
    ){
        e.preventDefault()
        if(socketRef.current){
            socketRef.current.emit("pwa")
            playerInLobby(setGameState)
        } 
    }

export function handlePlayWithFriend(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    socketRef: React.MutableRefObject<any>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
    )
    {
    e.preventDefault()
    setGameState((prev)=>{return{...prev, pwfInLobby: true}})
    
}

export function handlePlayMatched(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    socketRef: React.MutableRefObject<any>,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
){
    e.preventDefault()
    if(socketRef.current) {
        socketRef.current.emit("pwa_matched")
        playerInLobby(setGameState)
    }
}


function playerInLobby(setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>){
    setGameState( (prev) => {
                return {
                    ...prev,
                    inLobby: true
                }
            })
}