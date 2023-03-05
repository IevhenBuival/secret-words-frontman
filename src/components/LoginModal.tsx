import { useForm } from "react-hook-form";
import { ILoginCredentials } from "../hooks/words_api";
import { IUser } from "../models/user";
import * as wordsApi from "../hooks/words_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputFields from "./Form/TextInputFields";
import styles from "../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

interface ILoginModalProps {
    onDismiss: () => void,
    onLogin: (user: IUser) => void,
};
const LoginModal = ({ onDismiss, onLogin }: ILoginModalProps) => {
    const [showError, SetShowError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ILoginCredentials>();
    async function onSubmit(credentionals: ILoginCredentials) {
        try {
            const user = await wordsApi.login(credentionals);
            onLogin(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                SetShowError(error.message);
            } else {
                alert(error);
            }
            console.error(error);

        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header>
                <Modal.Title>
                    Log in
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    showError&&<Alert variant="danger">
                        {showError}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputFields
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputFields
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.width100}>
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;