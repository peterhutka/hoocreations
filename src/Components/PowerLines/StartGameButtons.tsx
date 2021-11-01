import React, { useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'
import { myContext } from '../Context'
import { handlePlayMatched, handlePlayWithAnybody, handlePlayWithFriend } from './functions/handlePlays'
import { GameStateInterface } from './PowerlinesInterfaces'
import styles from './styles.module.css'

export default function StartGameButtons(
    props: {
        socketRef: React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>,
        setGameState: React.Dispatch<React.SetStateAction<GameStateInterface>>,
        gameState: GameStateInterface
    }
) {

    const history = useHistory()
    let match = useRouteMatch();

    function handleLogin(e: React.MouseEvent<HTMLSpanElement, MouseEvent>){
        e.preventDefault()
        history.push(`${match.path}/login`)
    }

    const {user} = useContext(myContext)

    return (
        <div className={`${styles.startGameWrapper} `}>
            <div className={` ${styles.playButton}`} onClick={(e) => handlePlayWithAnybody(e, props.socketRef)}> Play with <span className={styles.accent}>Stranger</span></div>
            <div className={` ${styles.playButton}`} onClick={(e) => handlePlayWithFriend(e, props.socketRef, props.gameState, props.setGameState)}> Play with <span className={styles.accent}>Friend</span></div>
            {user ? 
                <div className={` ${styles.playButton}`} onClick={(e)=> handlePlayMatched(e, props.socketRef)}> Play <span className={styles.accent}>Matched Game</span></div> 
                : 
                <div className={`${styles.playButton}`} onClick={(e)=> handleLogin(e)}> <span className={styles.accent}>Login</span> To Play Matched</div>}  
        </div>
    )
}
