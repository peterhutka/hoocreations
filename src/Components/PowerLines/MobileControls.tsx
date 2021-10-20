import React from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import { squareInterface } from '../../Interfaces/Interfaces'
import { checkSqareAndMove } from './functions/checkSquares'
import { stopMove } from './functions/stopMove'
import { takeBase } from './functions/takeBase'
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCaretUp, faCaretDown, faCaretRight, faCaretLeft,  faFlag, faBan, } from "@fortawesome/free-solid-svg-icons"

import styles from './styles.module.css'
import { GameStateInterface } from './PowerlinesInterfaces'

export default function MobileControls(
    props: 
    {
        socketRefCur: Socket<DefaultEventsMap, DefaultEventsMap>,
        gridRef: React.MutableRefObject<squareInterface[] | null>,
        yourPositionRef: React.MutableRefObject<number | null>,
        contextRef: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
        movesLeft: number,
        setMessage: React.Dispatch<React.SetStateAction<string>>,
        gameState: GameStateInterface,
        setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
    }
    

) {
    const {
        socketRefCur,
        gridRef,
        yourPositionRef,
        contextRef,
        movesLeft,
        setMessage, 
    } = props

    function handleClick(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, direction: string){
        e.preventDefault()
        console.log("dir", direction)
        if(!props.gameState.letter) return

        if(direction === "UP") {
            checkSqareAndMove(yourPositionRef, gridRef, socketRefCur, - 1, contextRef,  props.gameState, props.setGameState)
        } else if(direction === "DOWN") {
        checkSqareAndMove(yourPositionRef, gridRef, socketRefCur, 1, contextRef,  props.gameState, props.setGameState)
        } else if(direction === "LEFT") {
            checkSqareAndMove(yourPositionRef, gridRef, socketRefCur, - 36, contextRef,  props.gameState, props.setGameState)
        } else if(direction === "RIGHT") {
            checkSqareAndMove(yourPositionRef, gridRef, socketRefCur, 36, contextRef, props.gameState, props.setGameState)
        } else if(direction === "TAKE" ) {
            (movesLeft === props.gameState.movesTotal) ? 
                takeBase(yourPositionRef, gridRef, socketRefCur, contextRef, setMessage,  props.gameState, props.setGameState) 
                : setMessage("You can only take base if you didnt move")
        } else if(direction === "STOP") {
            stopMove(socketRefCur, props.gameState, props.setGameState )
        }
    }

    const canTake = ((movesLeft === props.gameState.movesTotal) && props.gameState.onBase)
    const canStop = (movesLeft < props.gameState.movesTotal)

    return (
        <>
            
            <div className={styles.mobilePlaceholder}></div>
            <div className={styles.mobileControls}>
                <div className={`${styles.button} ${styles.ctrlButton} ${styles.upBtn}`} onClick={(e)=> handleClick(e, "UP")}> <FontAwesomeIcon icon={faCaretUp} size="3x" /> </div>

                { canTake && (<div className={`${styles.button} ${styles.ctrlButton} ${styles.centerBtn}`} onClick={(e)=> handleClick(e, "TAKE")}> <FontAwesomeIcon icon={faFlag} size="3x" /> </div>)}
                { canStop && (<div className={`${styles.button} ${styles.ctrlButton} ${styles.centerBtn}`} onClick={(e)=> handleClick(e, "STOP")}> <FontAwesomeIcon icon={faBan} size="3x" /> </div>)}

                <div className={`${styles.button} ${styles.ctrlButton} ${styles.downBtn}`} onClick={(e)=> handleClick(e, "DOWN")}> <FontAwesomeIcon icon={faCaretDown} size="3x" /> </div>
                <div className={`${styles.button} ${styles.ctrlButton} ${styles.rightBtn}`} onClick={(e)=> handleClick(e, "RIGHT")}> <FontAwesomeIcon icon={faCaretRight} size="3x" /> </div>
                <div className={`${styles.button} ${styles.ctrlButton} ${styles.leftBtn}`} onClick={(e)=> handleClick(e, "LEFT")}> <FontAwesomeIcon icon={faCaretLeft} size="3x" /> </div>
                {/*
                
                
                */}
            </div>
        </>
    )
}
