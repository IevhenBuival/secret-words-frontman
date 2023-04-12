import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import Styles from "../../styles/WordPage.module.css";
interface ITextInputFields {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  langForPattern?: string;
  error?: FieldError;
  hiden?: boolean;
  [x: string]: any;
}

const TextInputFields = ({
  name,
  hiden,
  label,
  register,
  langForPattern,
  registerOptions,
  error,
  ...props
}: ITextInputFields) => {
  interface WordPattern {
    value: RegExp;
    message: string;
  }
  function ReturnPattern(code: string | undefined): WordPattern {
    return code === "Latin"
      ? {
          value: /[A-Za-z]+$/,
          message: "Character does not correspond to the language ",
        }
      : {
          value: /[А-Яа-я]+$/,
          message: "Літера не відповідає мові",
        };
  }

  return (
    <Form.Group className="mt-3" controlId={name + "-input"}>
      <Form.Label className="mb-3">{label}</Form.Label>
      <div className={hiden ? Styles.hide : ""}>
        <Form.Control
          {...props}
          isInvalid={!!error}
          {...register(
            name,
            langForPattern
              ? {
                  ...registerOptions,
                  pattern: ReturnPattern(langForPattern),
                }
              : registerOptions
          )}
        />
      </div>

      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputFields;
