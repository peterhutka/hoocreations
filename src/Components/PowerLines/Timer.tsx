import React from 'react'
import { GameStateInterface } from './PowerlinesInterfaces';
import styles from './styles.module.css'

//todo argument type
export default function Timer(props: {
    gameState: GameStateInterface,
    displayedTime: {
        player: number;
        opponent: number;
    }
}) {

    let timeB = Math.floor(props.displayedTime.opponent/1000)
    let timeA = Math.floor(props.displayedTime.player/1000)
    if(timeA === 0 && timeB === 0){
        timeA = 20;
        timeB = 20;
    }

    let colorA ;
    let colorB ;
    if(props.gameState.toMove){
        colorA = (timeA % 2 === 0) ? "#141a2e" : "#dce0ef"
    } else {
        colorB = (timeB % 2 === 0) ? "#141a2e" : "#dce0ef"
    }

    const widthA = Math.max(Math.min(timeA / (timeA + timeB)*100, 90), 10)
    const widthB = Math.max(Math.min(timeB / (timeA + timeB)*100, 90), 10)

    const a = {
        backgroundColor: "#339989",
        width:  widthA + "%",
        //width: "35%"
        
        color: colorA,
        //alignSelf: 'flex-start'
        
    }
    const b = {
        backgroundColor: "#f96e46",
        width: widthB + "%",
        
        //alignSelf: 'flex-end',
        color: colorB,
        
        
    }


    return (
        <div className={styles.timerWrapper}>
            <div className={`${styles.playerWrapper}` } style={a}>
                <div className={styles.playerATimer}>{timeA}</div>
            </div>
            <div className={`${styles.playerWrapper}`}  style={b}>
                <div className={styles.playerBTimer}>{timeB}</div>
            </div>
        </div>
    )
}
