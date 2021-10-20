export interface GameStateInterface{
        pwfInLobby: boolean;
        time: {
            player: number;
            opponent: number;
        },
        gameStarted: boolean,
        movesLeft: number,
        movesTotal: number,
        toMove: boolean,
        onBase: boolean,
        letter: null | "A" | "B",
        timeLastUpdated: number | null,
        opponentsMovesLeft: number,
        hintNumber: number
    }