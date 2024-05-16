import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import { IGameTurn, IPlayer, TGameBoard } from './types/game-board';
import { WINNING_COMBINATIONS } from './constants/winning-combinations';
import GameOver from './components/GameOver';
import Log from './components/Log';
import { INITIAL_GAME_BOARD, PLAYERS } from './constants/common-constants';

const deriveGameBoard = (gameTurns: IGameTurn[]): TGameBoard[] => {
  const gameBoard: TGameBoard[] = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const deriveActivePlayer = (gameTurns: IGameTurn[]): string => {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O';
  }
  return activePlayer;
}

const deriveWinner = (gameBoard: TGameBoard[], players: IPlayer): string => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column] as 'X' | 'O';
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner as string;
}

function App() {
  const [players, setPlayers] = useState<IPlayer>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<IGameTurn[]>([]);

  const activePlayer: string = deriveActivePlayer(gameTurns);
  const gameBoard: TGameBoard[] = deriveGameBoard(gameTurns);
  const winner: string = deriveWinner(gameBoard, players);
  const hasDraw: boolean = gameTurns.length === 9 && !winner;

  function handleSquareClick(rowIndex: number, colIndex: number): void {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: activePlayer,
        },
        ...prevTurns
      ]
      return updatedTurns;
    })
  }

  function handleRestart(): void {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: string, newName: string): void {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player isActive={activePlayer === 'X'} initialName='Player 1' symbol='X' onChangeName={handlePlayerNameChange} />
            <Player isActive={activePlayer === 'O'} initialName='Player 2' symbol='O' onChangeName={handlePlayerNameChange} />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
          <GameBoard board={gameBoard} handleSquareClick={handleSquareClick} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
