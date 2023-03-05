import { Button } from "react-bootstrap";

interface INavBarLogOutView{
    onSignUpClicked:()=>void,
    onLogInClicked:()=>void
}

const NavBarLogOutView = ({onSignUpClicked,onLogInClicked}:INavBarLogOutView) => {
    return ( <>
    <Button onClick={onSignUpClicked}>
        Sign up
    </Button>
    <Button onClick={onLogInClicked}>
        Log in
    </Button>
    </> );
}
 
export default NavBarLogOutView;