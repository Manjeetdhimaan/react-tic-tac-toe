import { useCallback, useContext, useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import GameOverPortal from './components/GameOver';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './constants/winning-combinations';
import { INITIAL_GAME_BOARD, PLAYERS, productArray } from './constants/common-constants';
import { IGameTurn, IPlayer, TGameBoard } from './types/game-board';
import { ThemeContext } from './context/theme-context';

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

function flatArray<T>(arr: T[], flattenedArray: number[]): number[] {
  for (const el of arr) {
    if (typeof el === 'object') {
      flatArray(el as T[], flattenedArray);
    }
    else {
      flattenedArray.push(el as number);
    }
  }
  return flattenedArray;
}

function App() {
  const [players, setPlayers] = useState<IPlayer>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<IGameTurn[]>([]);

  const activePlayer: string = deriveActivePlayer(gameTurns);
  const gameBoard: TGameBoard[] = deriveGameBoard(gameTurns);
  const winner: string = deriveWinner(gameBoard, players);
  const hasDraw: boolean = gameTurns.length === 9 && !winner;
  // const dialog = useRef<{ open: () => void }>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const flattenedArray: number[] = [];
  const result = flatArray([1, [3, [4, 50], 0, [9]], [3], 9], flattenedArray);
  console.log(result);


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
    });
  }

  function handleRestart(): void {
    setGameTurns([]);
  }

  const handlePlayerNameChange = useCallback((symbol: string, newName: string): void => {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }, []);

  return (
    <>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player isActive={activePlayer === 'X'} initialName={PLAYERS.X} symbol={'X'} onChangeName={handlePlayerNameChange} />
            <Player isActive={activePlayer === 'O'} initialName={PLAYERS.O} symbol='O' onChangeName={handlePlayerNameChange} />
          </ol>
          {/* {(winner || hasDraw) &&  */}
          {/* {(winner || hasDraw) && <GameOverPortal ref={dialog} winner={winner} onRestart={handleRestart} />} */}
          <GameOverPortal open={winner || hasDraw} winner={winner} onRestart={handleRestart} />
          <GameBoard board={gameBoard} handleSquareClick={handleSquareClick} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
