import React from "react";
import { TGameBoard } from "../types/game-board";

interface GameBoardProps {
    board: TGameBoard[];
    handleSquareClick: (rowIndex: number, colIndex: number) => void
}

const GameBoard: React.FC<GameBoardProps> = ({ board, handleSquareClick }) => {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => handleSquareClick(rowIndex, colIndex)}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}

export default GameBoard;