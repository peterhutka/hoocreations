import React, { useContext } from 'react'
import { myContext } from '../Context'
import { GameStateInterface } from './PowerlinesInterfaces'
import styles from "./styles.module.css"

export default function Names(props:{
    gameState: GameStateInterface
}) {
    const {user} = useContext(myContext)
    const {ranked} = props.gameState

    return (
        <div className={styles.name}>
            <div className={styles.nameLeft}>
                {user? user.username : "You"} {ranked.elos[0] && <>({ranked.elos[0]})</>}
            </div>
            <div className={styles.nameRight}>
                {ranked.elos[1] && <>({ranked.elos[1]})</>} {props.gameState?.ranked.name || "The Bad Squares"} 
            </div>
        </div>
    )
}
