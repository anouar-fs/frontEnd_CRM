import { Form } from "react-router-dom";
import type { PropsWithChildren } from "react";
import "../LeadForm.scss"

type FormQuestionsProps = {
    isSubmitting: boolean;
    onCancel: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormQuestions = ({
    children,
    isSubmitting,
    handleSubmit,
    onCancel,
}: PropsWithChildren<FormQuestionsProps>) => {
return (
    <Form onSubmit={handleSubmit}>
    {children}

    <div className="form-actions">
        <button type="button" onClick={onCancel} className="secondary-btn">
        Cancel
        </button>

        <button disabled={isSubmitting} type="submit" className="primary-btn">
        Create Lead
        </button>
    </div>
    </Form>
);
};

export default FormQuestions