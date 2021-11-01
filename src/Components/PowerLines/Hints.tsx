import React, { useEffect } from 'react'
import { GameStateInterface } from './PowerlinesInterfaces'
import styles from './styles.module.css'

export default function Hints(props: {
    gameState: GameStateInterface,
    setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>
}) {


    const hints = [
        "Hello there Green Square, press W/A/S/D to move",
        "Move to closest base, it looks like X",
        "Take base by pressing SPACEBAR, it can only be done if it is the first move that round",
        "Now go take another base, you can press Q to finish round when you are on empty base",
        "Noticed that trail behind you? [Tap to continue]",
        "It connects you to your bases, each gives you one move [Tap to continue]",//5
        "If your opponent moves to your square, he can cut your trail and reduce the number of moves you have [Tap to continue]",
        "Cut your opponent and disconnect him from all of his basses to WIN [Tap to Close]"

    ]
    
    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>){
        e.preventDefault()
        if(props.gameState.hintNumber < 4) return
        props.setGameState((prev)=>{
            return {
                ...prev,
                hintNumber: props.gameState.hintNumber + 1
            }
        })
    }
    useEffect(()=>{
        if(props.gameState.hintNumber ===1 &&props.gameState.onBase ){
            props.setGameState((prev)=>{
                return {
                    ...prev,
                    hintNumber: 2
                }
            })  
        }
    }, )
    

    return (props.gameState.hintNumber < 8 && props.gameState.gameStarted) ? (
        <div className={styles.hints} onClick={handleClick} onTouchEnd={handleClick}>
            {hints[props.gameState.hintNumber]}
        </div>
    ) : null
}
