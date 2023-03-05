import {  Spinner, Table } from "react-bootstrap";
import styles from "../../styles/WordPage.module.css";
import { IUser } from "../../models/user";
import { useEffect, useState } from "react";
import UserCard from "../UserCard";
import * as WordsApi from "../../hooks/words_api";
import EditUserDlg from "../EditUserDlg";
import { UnauthorizedError } from "../../errors/http_errors";


interface IWordPageProps{
    loginUser:IUser|null,
}


const UsersPage = ({loginUser}:IWordPageProps) => {
    const [mdbLoading, setMdbLoading] = useState(true);
    const [showMdbLoadingErrors, setShowMdbLoadingErrors] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [userToEdit,setUserToEdit] = useState<IUser | null>(null);  
    const [unAuth,setUnAuth]= useState(false);;
    useEffect(() => {
        async function LoadUsers() {
    
          try {
            const resivedarray = await WordsApi.getUsers();
            setShowMdbLoadingErrors(false);
            setMdbLoading(true);
            setUsers(resivedarray);
          } catch (error) {
            if (error instanceof UnauthorizedError) setUnAuth(true)
            console.error(error);
            setShowMdbLoadingErrors(true);
          } finally {
            setMdbLoading(false);
          }
        }
        LoadUsers();
      }, []);
    const RowGrid = 
    <Table className = {styles.margin40} striped={true} bordered hover variant="blue-dark">
        <thead>
        <tr>
        
          <th>Name</th>
          <th>Rights</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((l) => (<UserCard
  currentUser={l}
  className={`${styles.tableRow}`}
  onLanguageClicked={setUserToEdit}
/>))}
      </tbody>
    </Table>
   
    return ( 
        <>
        {
    mdbLoading&&<Spinner animation='border' variant='primery'/>
  }
  {
    showMdbLoadingErrors&&(unAuth?<p>U have no rights to access data on this page</p>:<p>Something went wrong/ Please refrashe the page</p>)
  }
  {
    !mdbLoading&&!showMdbLoadingErrors&&<>
    {
      users.length > 0 ? RowGrid: <p>Your users is not created yet</p>
    }
    </>
  }
    {
    userToEdit && <EditUserDlg
    userToEdit={userToEdit}
      onDismiss={() => {
        setUserToEdit(null);
      }}
      onUserSave={(updUser) => {
        setUsers(users.map(l => l._id === updUser._id ? updUser : l));
        setUserToEdit(null);
      }}
    />
    
  }    


      </> 

     );
}
 
export default UsersPage;