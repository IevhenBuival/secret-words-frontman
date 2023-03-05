import { useForm } from "react-hook-form";
import { ISignUpCredentials } from "../hooks/words_api";
import * as wordsApi from "../hooks/words_api";
import { IUser } from "../models/user";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import TextInputFields from "./Form/TextInputFields";
import styles from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";


interface ISignUpModal {
    onDismiss: () => void,
    onSignUp: (user: IUser) => void,
}
const SignUpModal = ({ onDismiss, onSignUp }: ISignUpModal) => {
    const [showError,SetShowError]=useState<string|null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ISignUpCredentials>();

    async function onSubmit(credentials: ISignUpCredentials) {
        try {
            const newUser = await wordsApi.signUp(credentials);
            onSignUp(newUser)
        } catch (error) {
            if (error instanceof ConflictError) {
                SetShowError(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    };
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
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
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
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
                    type = "submit"
                    disabled = {isSubmitting}
                    className={styles.width100}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;