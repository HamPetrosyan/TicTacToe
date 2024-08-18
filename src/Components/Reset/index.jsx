import styles from "./Reset.module.scss";

export const Reset = ({ onReset }) => {
  return (
    <button onClick={onReset} className={styles["reset-button"]}>
      Play Again
    </button>
  );
};
