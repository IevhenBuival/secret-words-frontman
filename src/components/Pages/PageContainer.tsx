import { Container } from "react-bootstrap";
import styles from "../../styles/WordPage.module.css";
import { IUser } from "../../models/user";


interface IPageContainerProps{
    loginUser:IUser|null,
    children: React.ReactNode
}

const PageContainer = ({loginUser,children}:IPageContainerProps) => {
    return ( 
        <Container className={styles.WordPage}>
        <>
        {loginUser ? children:<p>Please log in to start</p>}
        </>
        
      </Container> 

     );
}
 
export default PageContainer;