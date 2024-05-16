import React from "react";
import { IGameTurn } from "../types/game-board";

interface LogProps {
    turns: IGameTurn[]
}

const Log: React.FC<LogProps> = ({ turns }) => {
    return (
        <ol id="log">
            {turns.map((turn) => (
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row},{turn.square.col}
                </li>
            ))}
        </ol>
    );
}

export default Log;