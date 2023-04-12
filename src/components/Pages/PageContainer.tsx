import { Container } from "react-bootstrap";
import styles from "../../styles/WordPage.module.css";
import { IUser } from "../../models/user";
import Splash from "./splash/splash";

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
          <Splash>
            <p>sign up and log in to start</p>
          </Splash>
        )}
      </>
    </Container>
  );
};

export default PageContainer;
