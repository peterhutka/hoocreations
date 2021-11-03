import React, { useEffect, useState } from 'react'
import { GameStateInterface } from './PowerlinesInterfaces'
import styles from './styles.module.css'

export default function PlayWithFriendsLobby(props: any) {
    const [roomCode, setRoomCode] = useState<string|null>(null)
    const [inputValue, setInputValue] = useState("")

    //todo get url in router
    

    

    

    useEffect(()=>{
        if(props.socketRef.current) props.socketRef.current.emit("pwf_getCode")

        props.socketRef.current.on("pwfCode", (code: string)=>{
            setRoomCode(()=>{ return code})
        })

        props.socketRef.current.on("pwfResponse", (code: string)=>{
            setRoomCode(()=>{ return code})
        })

        return ()=>{

        }
    }, [])

    function handleRoomCodeInput(e: React.ChangeEvent<HTMLInputElement>){
        //e.preventDefault()
        setInputValue(() => {
            return e.target.value
        })
        //e.target.value = inputValue
    }
    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
        e.preventDefault()
        if(props.socketRef.current) props.socketRef.current.emit("pwf_join", inputValue)
    }

    function handleClose(
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ){
        props.setGameState((prev: GameStateInterface)=>{return{...prev, pwfInLobby: false}})
    }

    return (
        <>
            <div className={styles.backBlur}></div>
            <div className={styles.powerlinesLogin}>
                <div className={styles.closeBtn} onClick={handleClose}>
                    X
                </div>
                <h1>Lobby</h1>
                <div>
                    Send room code to your friend: 
                </div>
                <div className={styles.lobbyCode}>{roomCode}</div>
                <div>
                    Or copy your friend's room code: 
                </div>
                <input className={styles.lobbyInput} onChange={(e) =>handleRoomCodeInput(e)}></input> 
                <div className ={styles.loginBtn} onClick={handleClick}> Join Game</div>
            </div>
        </>
    )
}
