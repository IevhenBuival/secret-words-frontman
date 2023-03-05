import styles from './word.module.css';
import { Card } from "react-bootstrap";
import { IWord } from "../models/word";
import { formatDate } from '../utils/formatDate';
import {MdDelete} from 'react-icons/md';
import { ILanguage } from '../models/language';
import { IUser } from '../models/user';



interface IWordProps{
    word: IWord,
    className?:string,
    onDelIconClick:(word:IWord)=>void,
    onWordCardClicked:  (word:IWord)=>void,  
    languages: ILanguage[],
    users: IUser[],
}

const Word = ( {word, className, onDelIconClick,onWordCardClicked,languages, users}:IWordProps)=>{
    const {
        title,
        createdAt,
        language,
        undatedAt,
        author,
    }=word;

    let createdUpdatedText:string;
    if (undatedAt>createdAt){
        createdUpdatedText = "Updated: "+formatDate(undatedAt);
    }else{
        createdUpdatedText = "Updated: "+formatDate(createdAt);
    }
    return (
        <Card className={`mb-3 ${styles.wordCard} ${className}`} onClick={()=>onWordCardClicked(word)}>
            <Card.Body className={`${styles.cardBody}`}>
                <Card.Title className={styles.flexCenter}>
                    {title}
                     <MdDelete className=' ms-auto ' 
                     onClick={(e)=>{
                        onDelIconClick(word);
                        e.stopPropagation();
                     }}
                     />
                   
                </Card.Title>
                <Card.Text className={`${styles.cardText} text-muted`}>
                {` ${createdUpdatedText} 
                language:${languages.find((l)=>l._id===language)?.name}
                author:${users.find((u)=>u._id===author)?.username}`}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Word;