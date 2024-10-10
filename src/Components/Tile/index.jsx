import styles from "./Tile.module.scss";

export const Tile = ({
  className,
  value,
  onTileClick,
  playerTurn,
  disabled,
}) => {
  let hoverClass = null;

  if (!disabled && value === null && playerTurn !== null) {
    hoverClass = styles[`${playerTurn.toLowerCase()}-hover`];
  }

  const valueClass =
    value === "X" ? styles["tile-x"] : value === "O" ? styles["tile-o"] : "";

  return (
    <div
      onClick={!disabled ? onTileClick : null}
      className={`${styles.tile} ${className} ${hoverClass} ${valueClass}`}
    >
      {value}
    </div>
  );
};
