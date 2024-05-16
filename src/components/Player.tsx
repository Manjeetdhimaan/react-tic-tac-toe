import React, { ChangeEvent, useState } from "react";

interface PlayerProps {
    isActive: boolean;
    initialName: string;
    symbol: string;
    onChangeName: (symbol: string, newName: string) => void
}

const Player: React.FC<PlayerProps> = ({ isActive, initialName, symbol, onChangeName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEdit() {
        setIsEditing(wasEditing => !wasEditing);
        if (isEditing) onChangeName(symbol, playerName)
    }

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChangeName} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}

export default Player;