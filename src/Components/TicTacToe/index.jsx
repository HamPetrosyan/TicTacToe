import { useEffect, useState } from "react";
import { Board } from "../Board";
import { Draw } from "../Draw";
import { GameState } from "../../js/GameState";
import { Reset } from "../Reset";

import styles from "./TicTacToe.module.scss";

import clickSoundAsset from "../../sounds/click.wav";
import finishSoundAsset from "../../sounds/finish.wav";

const Player_X = "X";
const Player_O = "O";

const winningCombinations = [
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const finishSound = new Audio(finishSoundAsset);
finishSound.volume = 0.2;

const checkWinner = (tiles, setStrikeClass, setWinner, setGameState) => {
  for (const { combo, strikeClass } of winningCombinations) {
    const [tileValue1, tileValue2, tileValue3] = combo.map((idx) => tiles[idx]);

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue2 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      setWinner(tileValue3);
      setGameState(GameState.won);
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);

  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  } else {
    setGameState(GameState.inProgress);
  }
};

export const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(Player_X);
  const [strikeClass, setStrikeClass] = useState();
  const [winner, setWinner] = useState(null);
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (idx) => {
    if (tiles[idx] !== null || winner) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[idx] = playerTurn;
    setTiles(newTiles);

    setPlayerTurn(playerTurn === Player_X ? Player_O : Player_X);
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(winner === Player_X ? Player_X : Player_O);
    setStrikeClass(null);
    setWinner(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setWinner, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      finishSound.play();
    }
  }, [gameState]);

  return (
    <div className={styles.container}>
      <h1>
        {winner ? (
          <>
            <span>Congratulations!</span> {winner} won.
          </>
        ) : (
          <>
            Tic Tac Toe with <span>React</span>
          </>
        )}
      </h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
        winner={winner}
      />
      <Draw gameState={gameState} />
      {gameState !== GameState.inProgress && (
        <Reset onReset={handleReset} gameState={gameState} />
      )}
    </div>
  );
};
