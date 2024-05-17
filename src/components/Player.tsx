import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from "react";

interface PlayerProps {
    isActive: boolean;
    initialName: string;
    symbol: string;
    onChangeName: (symbol: string, newName: string) => void
}

const Player: React.FC<PlayerProps> = ({ isActive, initialName, symbol, onChangeName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    useEffect(() => {
        const playerName = localStorage.getItem(symbol);
        if (playerName) {
            setPlayerName(playerName.toUpperCase());
        }
    }, [symbol]);

    function handleEdit() {
        setIsEditing(wasEditing => !wasEditing);

        if (isEditing) {
            onChangeName(symbol, playerName);
            localStorage.setItem(symbol, playerName.toUpperCase());
        }
    }

    function handleEnterKey(event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
        const code = (event as KeyboardEvent).code
        if (code === 'Enter' || !code) {
            setIsEditing(wasEditing => !wasEditing);
        }

        if (isEditing) {
            onChangeName(symbol, playerName);
            localStorage.setItem(symbol, playerName.toUpperCase());
        }
    }

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {

        const value = event.target.value;
        setPlayerName(value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChangeName} onKeyUp={handleEnterKey} />;
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