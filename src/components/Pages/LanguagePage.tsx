import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { ILanguage } from "../../models/language";
import AddEditLangDlg from "../AddEditLangDlg";
import styles from "../../styles/LangPage.module.css";
import * as WordsApi from "../../hooks/words_api";
import Language from "../Language";
import { UnauthorizedError } from "../../errors/http_errors";
import { useLanguages } from "../../hooks/useLanguages";

const LanguagePage = () => {
    const [showAddLangDlg, setShowAddLangDlg] = useState(false);
   const [langToEdit,setLangToEdit] = useState<ILanguage | null>(null);;
   /* const [langs, setLangs] = useState<ILanguage[]>([]);
    const [mdbLoading, setMdbLoading] = useState(true);
    const [showMdbLoadingErrors, setShowMdbLoadingErrors] = useState(false);
     const [unAuth,setUnAuth]= useState(false);
    /*useEffect(() => {
        async function LoadLanguages() {
    
          try {
            const resivedarray = await WordsApi.fetchLanguages();
            setShowMdbLoadingErrors(false);
            setMdbLoading(true);
            setLangs(resivedarray);
          } catch (error) {
            if (error instanceof UnauthorizedError) setUnAuth(true)

            console.error(error);
            setShowMdbLoadingErrors(true);
          } finally {
            setMdbLoading(false);
          }
        }
        LoadLanguages();
      }, []);*/
 const {languages,mdbLoading,showMdbLoadingErrors,unAuth,setLanguages} = useLanguages(false);

      const RowGrid = <Row xs={1}  >
    {languages.map((l) => (<Col key={l._id}><Language
      existlanguage={l}
      className={`${styles.word}`}
      onLanguageClicked={setLangToEdit}
    /></Col>))}
  </Row>

     return ( <div>

  {
    mdbLoading&&<Spinner animation='border' variant='primery'/>
  }
  {
    showMdbLoadingErrors&&(unAuth?<p>U have no rights to access data on this page</p>:<p>Something went wrong/ Please refrashe the page</p>)
  }
  {
    !mdbLoading&&!showMdbLoadingErrors&&<>
    {
      languages.length > 0 ? <><Button className={`mb-4 mt-4 ${styles.blockCenter}`} onClick={() => { setShowAddLangDlg(true) }}>
    <FaPlus className={styles.margin4} />Add new language
  </Button>{RowGrid}</>: <p>Your storehouse of words is empty</p>
    }
    </>
  }
  {
        showAddLangDlg &&      <AddEditLangDlg onDismiss={() => { setShowAddLangDlg(false) }}  onLangSave={(newLang) => {
          setLanguages([...languages, newLang]);
            setShowAddLangDlg(false);
          }} />
        
       
      }
        {
    langToEdit && <AddEditLangDlg
    LangToEdit={langToEdit}
      onDismiss={() => {
        setLangToEdit(null);
      }}
      onLangSave={(updLang) => {

        setLanguages(languages.map(l => l._id === updLang._id ? updLang : l));
        setLangToEdit(null);
      }}
    />
    
  }
    </div> );
     
}
 
export default LanguagePage;