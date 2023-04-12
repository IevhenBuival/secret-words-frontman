import styles from "./splash.module.css";

interface SplashProps {
  children: React.ReactNode;
}

const Splash = ({ children }: SplashProps) => {
  return (
    <div className="wrapper">
      <div className={`${styles.block} ${styles.wrapperBlue}`}>
        <span className={`${styles.inline} ${styles.blockBlue}`}>S</span>
        <span className={`${styles.inline} ${styles.FinRedWord}`}>Word</span>
      </div>
      {children}
      <div className={`${styles.block} ${styles.wrapperRed}`}>
        <span className={`${styles.inline} ${styles.blockRed}`}>W</span>
        <span className={`${styles.inline} ${styles.FinBlueWord}`}>Secret</span>
      </div>
    </div>
  );
};

export default Splash;
