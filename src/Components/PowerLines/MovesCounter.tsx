import React from 'react'
import styles from './styles.module.css'

export default function MovesCounter(
    props: {
    movesLeft: number,
    movesTotal: number,
    hintNumber: number
    }
    
) {
    const style= {
        //width: "100%",
        //backgroundColor: "red"
    }

    

    return (
        <div className={styles.moveWrapper}>
            <div className={`${styles.moveFlex}` } style={style}>
               Moves: {props.movesLeft}/{props.movesTotal}
            </div>
            
        </div>
    )
}
