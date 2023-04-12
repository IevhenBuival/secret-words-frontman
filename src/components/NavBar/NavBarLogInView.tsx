import { IUser } from "../../models/user";
import * as wordsApi from "../../hooks/words_api";
import { Button, Navbar } from "react-bootstrap";

interface INavBarLogInView {
  user: IUser;
  onLogout: () => void;
}

const NavBarLogInView = ({ user, onLogout }: INavBarLogInView) => {
  async function logout() {
    try {
      await wordsApi.logout();
      onLogout();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default NavBarLogInView;
