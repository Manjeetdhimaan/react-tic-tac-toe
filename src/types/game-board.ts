export type TGameBoard = (string | null)[];

export interface IGameTurn {
    square: { row: number, col: number }, player: string
}

export interface IPlayer {
    X: string,
    O: string
}
