//todo persist player through localstorige when disconnected
//todo modal for cookies consent 

import {useContext, useEffect, useRef, useState} from 'react'
import { io, Socket } from "socket.io-client";
import { myContext } from '../Context';
import drawGrid from './functions/drawGrid';
import { squareInterface } from '../../Interfaces/Interfaces';
import { setUpCanvas } from './functions/setUpCanvas';
import { ioSetup } from './functions/ioSetup';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { ioHandle_pwaResponse } from './functions/io/ioHandle_pwaResponse';
import { ioHandle_gameStarted } from './functions/io/ioHandle_gameStarted';
import { ioHandle_gameStartsIn } from './functions/io/ioHandle_gameStartsIn';
import { ioHandle_mapInitialized } from './functions/io/ioHandle_mapInitialized';
import { ioHandle_roundStarts } from './functions/io/ioHandle_roundStarts';
import { ioHandle_gridUpdate } from './functions/io/ioHandle_gridUpdate';
import { ioHandle_alreadyMoved } from './functions/io/ioHandle_alreadyMoved';
import { ioHandle_roundDone } from './functions/io/ioHandle_roundDone';
import { ioHandle_endgame } from './functions/io/ioHandle_endgame';
import "../../main.css"
import { drawEffectsGrid } from './functions/drawEffectsGrid';
//import PlayWithFriends_lobby from './playWithFriends_lobby';
import PlayWithFriendsLobby from './PlayWithFriendsLobby';
import MovesCounter from './MovesCounter';
import MobileControls from './MobileControls';
import {isMobile} from 'react-device-detect';
import styles from './styles.module.css'
import StartGameButtons from './StartGameButtons';
import PowelinesNavbar from './PowelinesNavbar';
import { GameStateInterface } from './PowerlinesInterfaces';
import Timer from './Timer';
import PowerlinesCanvas from './PowerlinesCanvas';
import { initialGameState } from './functions/initialGameState';
import Hints from './Hints';
import Names from './Names';
import ioHandle_rankedInfo from './functions/io/ioHandle_rankedInfo';

export default function HomePowerLines() {
    const {user} = useContext(myContext)


    

    const [gameState, setGameState] = useState<GameStateInterface>(initialGameState)
    const [displayedTime, setDisplayedTime] = useState({
        player: 0,
        opponent: 0
    })

    const [message, setMessage] = useState<string>("You are not in room/queue yet")
    const [messageOn, setMessageOn] = useState<boolean>(false)
    

    const canvasRef         = useRef<HTMLCanvasElement | null>(null);
    const canvasEffectsRef  = useRef<HTMLCanvasElement | null>(null);
    const contextRef        = useRef<CanvasRenderingContext2D | null | undefined>(null);
    const contextEffectsRef = useRef<CanvasRenderingContext2D | null | undefined>(null);
    const gridRef           = useRef<squareInterface[] | null>(null)
    const yourPositionRef   = useRef<number|null>(null)
    const socketRef         = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
    //const toMove = useRef<boolean>(false)
    
    
    
    

    
    

    function displayMessage(msg: string){
        setMessage(msg)
        setMessageOn(true)
        const oldMsg = msg;
        setTimeout(()=>{
            if(oldMsg === msg)setMessageOn(false)
        }, 4000)
    }

    function updateTime(){
        if(!gameState.timeLastUpdated || !gameState.gameStarted ) return
        
        const temp = {
            player: gameState.toMove ? gameState.time.player - (Date.now() - gameState.timeLastUpdated) : gameState.time.player,
            opponent: gameState.toMove ? gameState.time.opponent : gameState.time.opponent - (Date.now() - gameState.timeLastUpdated)
        }
        
        //setDisplayedTime(temp)
        setDisplayedTime((prev)=>temp)
    }

    useEffect(()=>{
        updateTime()
        const coutnerInterval = setInterval(()=>{
            if(gameState.gameStarted) updateTime()
            },1000)


        return ()=>{
            clearInterval(coutnerInterval)
        }
    }, [gameState.time])

    
    //todo dont use this function but setGamestate

    function updatePosition(pos: number){
        yourPositionRef.current = pos
    }

    //todo merge multiple useEffects
    useEffect(()=>{
        //setMovesLeft((prev)=>movesTotal)
        setGameState((prev)=>{
            return {
                ...prev,
                movesLeft: prev.movesTotal
            }
        })
    }, [])



    useEffect(() => {      

        setUpCanvas(canvasRef, contextRef)
        setUpCanvas(canvasEffectsRef, contextEffectsRef)

        //for every rerender draw grid 

        if(gridRef.current/* && !initialGridDrawn && gameStarted*/){
            drawGrid(gridRef.current, contextRef.current, gameState)
            drawEffectsGrid(gridRef.current, contextEffectsRef.current, yourPositionRef, gameState)
            //setInitialGridDrawn (()=> true)
        }

        return () => {
            
        }
    } )

    useEffect(()=>{
        if(gridRef.current/* && !initialGridDrawn && gameStarted*/){
            drawGrid(gridRef.current, contextRef.current, gameState)
            drawEffectsGrid(gridRef.current, contextEffectsRef.current, yourPositionRef, gameState)
            //setInitialGridDrawn (()=> true)
        }

        return () => {
            
        }
    }, [gameState])

    useEffect( () => {
        // todo - merge time and timeLastUpdated and maybe displayed time to one object , displayedtime

        socketRef.current = ioSetup(io);

        if(socketRef){
            ioHandle_pwaResponse    (socketRef.current, setMessage)
            ioHandle_gameStarted    (socketRef.current, setMessage,  gameState, setGameState)
            ioHandle_gameStartsIn   (socketRef.current, setMessage, setGameState)
            ioHandle_rankedInfo     (socketRef.current, setGameState)
            ioHandle_mapInitialized (socketRef.current, setMessage, contextRef, gridRef, yourPositionRef, gameState)
            ioHandle_gridUpdate     (socketRef.current, gridRef, contextRef, yourPositionRef, updatePosition,   contextEffectsRef, gameState, setGameState)
            ioHandle_alreadyMoved   (socketRef.current, setMessage)
            ioHandle_roundDone      (socketRef.current, gameState, setGameState)
            ioHandle_endgame        (socketRef.current, setMessage, gameState, setGameState)
        }
        if(socketRef.current){
            ioHandle_roundStarts    (socketRef.current, gameState, setGameState)
        }
        
        
        return function cleanUp(){
            if (socketRef.current) socketRef.current.disconnect()
        }
    },[])    

    //todo play with friends lobby as separate route
    return (
        <div className={styles.wrapper}>
            <PowelinesNavbar />
            
            {gameState.pwfInLobby 
                && <PlayWithFriendsLobby socketRef={socketRef} setGameState={setGameState} gameState={gameState}/> }
            {gameState.gameStarted 
                && <Timer gameState={gameState} displayedTime={displayedTime}/> }            
            {gameState.gameStarted 
                && <MovesCounter movesLeft={gameState.movesLeft} movesTotal={gameState.movesTotal} hintNumber={gameState.hintNumber}/>}
             {gameState.gameStarted 
                && <Names gameState={gameState} />}
            {(!gameState.gameStarted && !gameState.pwfInLobby ) 
                && <StartGameButtons socketRef={socketRef} gameState={gameState} setGameState={setGameState}/>}

            <PowerlinesCanvas canvasRef={canvasRef}
                socketRef={socketRef}
                gridRef={gridRef}
                yourPositionRef={yourPositionRef}
                contextRef={contextRef}
                canvasEffectsRef={canvasEffectsRef}
                gameState={gameState}
                setGameState={setGameState}
                setMessage={setMessage}
                />

            <Hints gameState={gameState} setGameState={setGameState}/>
            
            {(isMobile && socketRef.current && gameState.gameStarted) && <MobileControls 
                    socketRefCur={socketRef.current}
                    gridRef={gridRef}
                    yourPositionRef={yourPositionRef}
                    contextRef={contextRef}
                    movesLeft={gameState.movesLeft}
                    setMessage={setMessage}
                    gameState={gameState}
                    setGameState={setGameState}
                /> }
                
        </div>
    )
}

