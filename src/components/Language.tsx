import { Card } from "react-bootstrap";
import { ILanguage } from "../models/language";
import styles from './word.module.css';

interface ILangProps{
    existlanguage: ILanguage,
    className?:string,
    onLanguageClicked:  (lang:ILanguage)=>void,  
}

const Language = ({existlanguage,className,onLanguageClicked}:ILangProps) => {
    const {
        name, 
        _id,      
    }=existlanguage;
    
    return (  <div>
        <Card className={`mb-3 ${styles.wordCard} ${className}`} onClick={()=>onLanguageClicked(existlanguage)}>
            <Card.Body className={`${styles.cardBody}`}>
                <Card.Title className={styles.cardText}>
                    {name}                
                </Card.Title>
                <Card.Text className={`${styles.flexCenter} text-muted`}>
                {`  id:${_id}
                `}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>);
}
 
export default Language;