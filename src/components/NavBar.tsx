import { Container, Nav, Navbar } from "react-bootstrap";
import { IUser } from "../models/user";
import NavBarLogInView from "./NavBarLogInView";
import NavBarLogOutView from "./NavBarLogOutView";
import {Link} from 'react-router-dom';
import Styles from '../styles/WordPage.module.css';
interface INavBar{
    loggedInUser:IUser|null,
    onSignupClicked:()=>void,
    onLoginClicked:()=>void,
    onLogOut:()=>void,

}
const NavBar = ({loggedInUser,onSignupClicked,onLoginClicked,onLogOut}:INavBar) => {
    return ( <Navbar bg="primary" variant="dark" expand='sm' sticky="top" className={Styles.NavBar}>
        <Container >
            <Navbar.Brand>Word manager</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id = "main-navbar" className="ml-auto">
            
            <Nav> 
                <Nav.Link as={Link} to='/'>
                  Words
                </Nav.Link>           
            </Nav>
            <Nav className="ml-100">
                <Nav.Link as={Link} to='/language'>
                   Language
                </Nav.Link>
               </Nav>
            <Nav> 
                <Nav.Link as={Link} to='/users'>
                  Users
                </Nav.Link>           
            </Nav>
            <Nav className='ms-auto'>
                {loggedInUser?<NavBarLogInView user={loggedInUser} onLogout={onLogOut}/>:<NavBarLogOutView onLogInClicked={onLoginClicked} onSignUpClicked={onSignupClicked}/>}
            </Nav>
            

            
        </Navbar.Collapse>
        </Container>
    </Navbar> );
}
 
export default NavBar;