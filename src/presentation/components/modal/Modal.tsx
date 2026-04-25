import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss"
import { X } from "lucide-react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
    <div className="overlay" onClick={onClose}>
        <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="header">
            <h2>{title}</h2>
            <button className="close-btn" onClick={onClose}>
                <X size={20} strokeWidth={2.2} />
            </button>
            </div>

            <div className="content">{children}</div>
        </div>
        </div>,
    document.body
);
}

export default Modal