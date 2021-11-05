import React, { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import { squareInterface } from '../../Interfaces/Interfaces'
import { handleKeyDown } from './functions/handleKeyDown'
import { GameStateInterface } from './PowerlinesInterfaces'
import styles from './styles.module.css'

export default function PowerlinesCanvas(props:{
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    canvasEffectsRef: React.MutableRefObject<HTMLCanvasElement | null>,
    gridRef: React.MutableRefObject<squareInterface[] | null>,
    yourPositionRef: React.MutableRefObject<number | null>,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
    socketRef: React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,


}) {
    useEffect(()=>{
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        }
    })


    function handleUserKeyPress(e: KeyboardEvent){
        if(!props.gameState.gameStarted) return
        if(!props.socketRef.current) return
        if(!props.gameState.toMove) return
        
        handleKeyDown(e, props.socketRef.current, props.gridRef, props.yourPositionRef, props.contextRef, props.setMessage, props.gameState, props.setGameState )
    }

    return (
        <>
            <div className={styles.canvasWrapper}>
                    <canvas ref={props.canvasRef} className={styles.firstCanvas} >
                    </canvas>
                    <canvas className={styles.secondCanvas} ref={props.canvasEffectsRef}tabIndex={0} >
                    </canvas>
            </div>
        </>
    )
}
