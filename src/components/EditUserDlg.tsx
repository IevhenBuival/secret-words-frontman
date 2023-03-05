import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "../models/user";
import * as WordApi from "../hooks/words_api";
import { AccessError, ConflictError, InvalidId, NotFoundError } from "../errors/http_errors";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputFields from "./Form/TextInputFields";

interface IEditUserDialog {
    userToEdit: IUser,
    onDismiss: () => void,
    onUserSave: (user: IUser) => void,
}

const EditUserDlg = ({ userToEdit, onDismiss, onUserSave }: IEditUserDialog) => {
    const [showError, SetShowError] = useState<String | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WordApi.IUserInput>({
        defaultValues: {
            email: userToEdit?.email || "",
            password: userToEdit?.password || "",
            rights: userToEdit?.rights || "user",
        }
    });
    useEffect(() => {
        SetShowError(null);
    }, [register]);
    async function onSubmit(input: WordApi.IUserInput) {
        try {
            let userResponce: IUser;
            if (userToEdit) {
                console.log(userToEdit._id);
                userResponce = await WordApi.updateUser(userToEdit._id, input);
                onUserSave(userResponce);
            }
        } catch (error) {
            if ((error instanceof AccessError) || (error instanceof ConflictError) || (error instanceof InvalidId) || (error instanceof NotFoundError)) {
                SetShowError(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }
    return (<Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                {'Edit ' + userToEdit.username + ' parametrs'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {showError && <Alert variant="danger">
                {showError}
            </Alert>}
            <Form id="EditUserForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputFields
                    name='email'
                    label="Email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    error={errors.email}
                />

                <TextInputFields
                    name='rights'
                    label='Rights'
                    type="text"
                    placeholder="rights"
                    register={register}
                    error={errors.rights}
                />

                <TextInputFields
                    name='password'
                    label='Password'
                    type="password"
                    placeholder="password"
                    register={register}
                    error={errors.rights}
                />

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                form="EditUserForm"
                type="submit"
                disabled={isSubmitting}
            >
                Save
            </Button>
        </Modal.Footer>
    </Modal>);
}

export default EditUserDlg;