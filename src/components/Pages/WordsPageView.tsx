import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useLanguages } from "../../hooks/useLanguages";
import * as WordsApi from "../../hooks/words_api";
import { IUser } from "../../models/user";
import { IWord } from "../../models/word";
import styles from "./AllPages.module.css";
import AddEditWordDlg from "../Dialogs/AddEditWordDlg";
import Word from "../Word";

const WordsPageView = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [wrdLoading, setWrdLoading] = useState(true);
  const [showWrdLoadingErrors, setShowWrdLoadingErrors] = useState(false);
  const [showAddWordDlg, setShowAddWordDlg] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<IWord | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { languages, showMdbLoadingErrors, mdbLoading } = useLanguages();

  useEffect(() => {
    async function LoadWords() {
      try {
        const resivedWords = await WordsApi.fetchWords();
        setShowWrdLoadingErrors(false);
        setWrdLoading(true);
        setWords(resivedWords);
      } catch (error) {
        console.error(error);
        setShowWrdLoadingErrors(true);
      } finally {
        setWrdLoading(false);
      }
    }
    async function LoadUsers() {
      try {
        const resivedUsers = await WordsApi.getUsers();
        setShowWrdLoadingErrors(false);
        setWrdLoading(true);
        setUsers(resivedUsers);
      } catch (error) {
        console.error(error);
        setShowWrdLoadingErrors(true);
      } finally {
        setWrdLoading(false);
      }
    }
    LoadWords();
    LoadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteWordCard(delword: IWord) {
    try {
      await WordsApi.deleteWord(delword._id);
      setWords(
        words.filter((existingWords) => existingWords._id !== delword._id)
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  const RowGrid = useMemo(() => {
    return (
      <Row xs={1} md={2} xl={3}>
        {words
          .filter((w) => {
            if (w.language !== selectedValue)
              return !selectedValue ? true : false;
            return true;
          })
          .map((w) => (
            <Col key={w._id}>
              <Word
                word={w}
                users={users}
                languages={languages}
                className={`${styles.word}`}
                onDelIconClick={deleteWordCard}
                onWordCardClicked={setWordToEdit}
              />
            </Col>
          ))}
      </Row>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, words]);

  return (
    <Container className={styles.container}>
      <Container className={`${styles.TopPanel}`}>
        <Button
          className={`mt-1 ${styles.blockCenter}`}
          onClick={() => {
            setShowAddWordDlg(true);
          }}
        >
          <FaPlus className="ml-0" />
          Add new word
        </Button>

        <span className="d-sm-inline-block pr-4  pt-1 ">
          <select
            className="form-select form-select-sm mb-3 bg-primary text-bg-primary"
            aria-label=".form-select-lg"
            onChange={(e) => {
              setSelectedValue(e.target.value);
            }}
          >
            <option value="">all cards</option>
            {languages.map((l) => (
              <option key={l._id} value={l._id}>
                {l.name}
              </option>
            ))}
          </select>
        </span>
      </Container>
      <Container className={styles.Float}>
        {wrdLoading && mdbLoading && (
          <Spinner animation="border" variant="primery" />
        )}
        {showWrdLoadingErrors && showMdbLoadingErrors && (
          <p>Something went wrong/ Please refrashe the page</p>
        )}
        {!wrdLoading &&
          !showWrdLoadingErrors &&
          !showMdbLoadingErrors &&
          !mdbLoading && (
            <>
              {words.length > 0 ? (
                RowGrid
              ) : (
                <p>Your storehouse of words is empty</p>
              )}
            </>
          )}
      </Container>
      {showAddWordDlg && (
        <AddEditWordDlg
          languages={languages}
          currentLanguage={selectedValue}
          onDismiss={() => {
            setShowAddWordDlg(false);
          }}
          onWordSave={(newWord) => {
            setWords([...words, newWord]);
            setShowAddWordDlg(false);
          }}
        />
      )}
      {wordToEdit && (
        <AddEditWordDlg
          languages={languages}
          WordToEdit={wordToEdit}
          onDismiss={() => {
            setWordToEdit(null);
          }}
          onWordSave={(updWord) => {
            setWords(words.map((w) => (w._id === updWord._id ? updWord : w)));
            setWordToEdit(null);
          }}
        />
      )}
    </Container>
  );
};

export default WordsPageView;
