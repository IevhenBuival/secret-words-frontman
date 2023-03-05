import { IUser } from "../models/user";

interface IUserCardProps {
    currentUser: IUser,
    className?: string,
    onLanguageClicked: (lang: IUser) => void,
}

const UserCard = ({ currentUser, className, onLanguageClicked }: IUserCardProps) => {
    const {
        username,
        rights,
        email,
    } = currentUser;

    return (<tr onClick={() => onLanguageClicked(currentUser)}>
        <td>{username}</td>
        <td>{rights}</td>
        <td>{email}</td>
    </tr>
    );
}

export default UserCard;