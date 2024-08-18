import { Tile } from "../Tile";
import { Strike } from "../Strike";

import styles from "./Board.module.scss";

export const Board = ({
  tiles,
  onTileClick,
  playerTurn,
  strikeClass,
  winner,
}) => {
  const tileClasses = [
    styles["right-border"] + " " + styles["bottom-border"],
    styles["right-border"] + " " + styles["bottom-border"],
    styles["bottom-border"],
    styles["right-border"] + " " + styles["bottom-border"],
    styles["right-border"] + " " + styles["bottom-border"],
    styles["bottom-border"],
    styles["right-border"],
    styles["right-border"],
    "",
  ];

  const disabled = winner !== null;

  return (
    <div className={styles.board}>
      {tiles.map((value, idx) => (
        <Tile
          key={idx}
          playerTurn={playerTurn}
          onTileClick={() => onTileClick(idx)}
          value={value}
          className={tileClasses[idx]}
          disabled={disabled}
        />
      ))}
      <Strike strikeClass={strikeClass} winner={winner} />
    </div>
  );
};
