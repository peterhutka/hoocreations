export interface GameStateInterface{
        pwfInLobby: boolean;
        inLobby: boolean;
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
        hintNumber: number,
        ranked: {
            isRanked: boolean,
            name: string | null;
            elos: number[]
        }
    }