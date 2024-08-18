import { GameState } from "../../js/GameState";

import styles from "./Draw.module.scss";

export const Draw = ({ gameState }) => {
  switch (gameState) {
    case GameState.inProgress:
      return <></>;
    case GameState.won:
      return <></>;
    case GameState.draw:
      return <div className={styles.draw}>Draw</div>;
    default:
      <></>;
  }
};
