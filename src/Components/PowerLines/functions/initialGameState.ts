import { GameStateInterface } from "../PowerlinesInterfaces";

export const initialGameState: GameStateInterface = {
    pwfInLobby: false,
    time: {
        player: 0, 
        opponent: 0,
    },
    gameStarted: false,
    movesLeft: 1,
    movesTotal: 1,
    toMove: false,
    onBase: false,
    letter: null,
    timeLastUpdated: null,
    opponentsMovesLeft: 1, 
    hintNumber: 0
}