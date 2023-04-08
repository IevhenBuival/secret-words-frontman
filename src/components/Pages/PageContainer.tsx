import { Container } from "react-bootstrap";
import styles from "../../styles/WordPage.module.css";
import { IUser } from "../../models/user";

interface IPageContainerProps {
  loginUser: IUser | null;
  children: React.ReactNode;
}

const PageContainer = ({ loginUser, children }: IPageContainerProps) => {
  return (
    <Container className={styles.WordPage}>
      <>
        {loginUser ? (
          children
        ) : (
          <div className="wrapper">
            <div className={`${styles.block} ${styles.wrapperBlue}`}>
              <span className={`${styles.inline} ${styles.blockBlue}`}>S</span>
              <span className={`${styles.inline} ${styles.FinRedWord}`}>
                Word
              </span>
            </div>
            <p>sign up and log in to start</p>
            <div className={`${styles.block} ${styles.wrapperRed}`}>
              <span className={`${styles.inline} ${styles.blockRed}`}>W</span>
              <span className={`${styles.inline} ${styles.FinBlueWord}`}>
                Secret
              </span>
            </div>
          </div>
        )}
      </>
    </Container>
  );
};

export default PageContainer;
