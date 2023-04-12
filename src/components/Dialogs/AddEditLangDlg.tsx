import { useEffect, useState } from "react";
import { ILanguage } from "../../models/language";
import * as WordApi from "../../hooks/words_api";
import { useForm } from "react-hook-form";
import {
  AccessError,
  ConflictError,
  InvalidId,
  NotFoundError,
} from "../../errors/http_errors";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputFields from "../Form/TextInputFields";
import { useLanguages } from "../../hooks/useLanguages";

interface IEditAddLangDialog {
  LangToEdit?: ILanguage;
  onDismiss: () => void;
  onLangSave: (lang: ILanguage) => void;
}

const AddEditLangDlg = ({
  LangToEdit,
  onDismiss,
  onLangSave,
}: IEditAddLangDialog) => {
  const [showError, SetShowError] = useState<String | null>(null);
  const { charSets, showMdbLoadingErrors } = useLanguages();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WordApi.ILangInput>({
    defaultValues: {
      name: LangToEdit?.name || "",
      charset:
        charSets.find((n) => n._id === LangToEdit?.charset)?.name || "Latin",
    },
  });
  const [selectedValue, setSelectedValue] = useState<string>("Latin");

  useEffect(() => {
    SetShowError(null);
  }, [register]);

  useEffect(() => {
    const newselect = charSets.find((n) => n._id === LangToEdit?.charset)?.name;
    if (newselect) setSelectedValue(newselect);
  }, [LangToEdit?.charset, charSets]);
  async function onSubmit(input: WordApi.ILangInput) {
    try {
      let wordResponse: ILanguage;
      if (LangToEdit) {
        wordResponse = await WordApi.updateLang(LangToEdit._id, input);
      } else {
        wordResponse = await WordApi.createLang(input);
      }
      onLangSave(wordResponse);
    } catch (error) {
      if (
        error instanceof AccessError ||
        error instanceof ConflictError ||
        error instanceof InvalidId ||
        error instanceof NotFoundError
      ) {
        SetShowError(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }
  return (
    <>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>
            {LangToEdit ? "Edit word card" : "Add word card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showError && showMdbLoadingErrors && (
            <Alert variant="danger">{showError}</Alert>
          )}
          <Form id="AddEditLangForm" onSubmit={handleSubmit(onSubmit)}>
            <TextInputFields
              name="name"
              label="Name"
              type="text"
              placeholder="Name"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.name}
            />
            <Form.Label className="mb-3 mt-3">charset</Form.Label>
            <Form.Select
              aria-label="Default select"
              value={selectedValue}
              {...register("charset")}
              onChange={(e) => {
                setSelectedValue(e.target.value);
              }}
            >
              {charSets.map((cs) => (
                <option value={cs.name}>{cs.name}</option>
              ))}
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button form="AddEditLangForm" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEditLangDlg;
