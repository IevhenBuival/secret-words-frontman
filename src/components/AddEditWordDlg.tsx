import { Alert, Button, Form, Modal } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { AccessError, ConflictError, InvalidId, NotFoundError } from "../errors/http_errors";
import * as WordApi from "../hooks/words_api";
import { IWord } from "../models/word";
import TextInputFields from "./Form/TextInputFields";

import { ILanguage } from "../models/language";


interface IEditAddWordDialog {
    WordToEdit?: IWord,
    onDismiss: () => void,
    onWordSave: (word: IWord) => void,
    languages: ILanguage[],
    currentLanguage?:string;
}

const AddEditWordDlg = ({ WordToEdit, onDismiss, onWordSave,languages,currentLanguage }: IEditAddWordDialog) => {
     
    const [showError,SetShowError] = useState<string|null>(null);
    
    const [selectedValue,setSelectedValue] = useState<string|undefined>(WordToEdit?.language||currentLanguage?currentLanguage:languages?languages[0]._id:'');
  
     const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WordApi.IWordInput>({
      defaultValues: {
            title: WordToEdit?.title || "",
            language: WordToEdit?.language || selectedValue,
        }
    });

  

    useEffect(()=>{
        SetShowError(null);
    },[register])
    async function onSubmit(input: WordApi.IWordInput) {
        
        try {
            let wordResponce: IWord;
            if (WordToEdit) {
                wordResponce = await WordApi.updateWord(WordToEdit._id, input);
            } else {
                wordResponce = await WordApi.createWord(input);
            }
            onWordSave(wordResponce);
        } catch (error) {
            if ((error instanceof AccessError)||(error instanceof ConflictError)||(error instanceof InvalidId)||(error instanceof NotFoundError)) {
                SetShowError(error.message);
            } else {
                 
                alert(error);
            }
            
            console.log(error);
            
        }

    }
    
    return (<Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                {WordToEdit?'Edit word card':'Add word card'}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {showError&&<Alert variant="danger">
                {showError}
            </Alert>}
            {errors.title&&<Alert variant="danger">{errors.title?.message}</Alert>}
            <Form id="AddEditWordForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputFields 
                name = 'title'
                label="Title"
                type="text"
                placeholder="Title"
                register={register}
                registerOptions={selectedValue==='63f2400bc1ee59dffb6258ff'?{
                    pattern:{ value:/[A-Za-z]/, message:'Character does not correspond to the language '}, required: {value:true,message:'Fill in the title'}
                  }:{ pattern:{ value:/[А-Яа-я]/, message:'Літера не відповідає мові'}, required: {value:true,message:'Заповніть назву'}}}
                error={errors.title}
                />
                
                <Form.Label className="mb-3 mt-3">
                Language
                </Form.Label>
                <Form.Select aria-label="Default select example"
                    {...register("language")}
                    
                    onChange={(e)=>{
                        setSelectedValue(e.target.value);
                        
                    }}

                >
                    {languages.map(l=><option value={l._id}>{l.name}</option>)}
                    
                    

                </Form.Select>

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                form="AddEditWordForm"
                type="submit"
                disabled={isSubmitting}
            >
                Save
            </Button>
        </Modal.Footer>
    </Modal>);
}

export default AddEditWordDlg;