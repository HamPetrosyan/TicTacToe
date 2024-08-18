import styles from "./Strike.module.scss";

export const Strike = ({ strikeClass, winner }) => {
  const colorClass =
    winner === "X"
      ? styles["strike-x"]
      : winner === "O"
      ? styles["strike-o"]
      : "";

  return (
    <div
      className={`${styles.strike} ${styles[strikeClass]} ${colorClass}`}
    ></div>
  );
};
