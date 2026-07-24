import React from "react";
import "./deletemodal.css";

type DeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
};

const DeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Blog Post",
    message = "Are you sure you want to delete this blog post? This action cannot be undone."
}: DeleteModalProps) => {
    if (!isOpen) return null;


    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-card">
                <div className="modal-header">
                    
                    <h3 className="modal-title">{title}</h3>
                </div>
                <div className="modal-body">
                    <p className="modal-message">{message}</p>
                </div>
                <div className="modal-actions">
                    <button onClick={onClose} className="modal-btn modal-cancel-btn">Cancel</button>
                    <button onClick={onConfirm} className="modal-btn modal-delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
