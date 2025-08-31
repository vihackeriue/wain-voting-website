import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap'; // Using Bootstrap Toast for notifications

const CustomAlert = ({ message, type, show, handleClose }) => {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={handleClose} bg={type} autohide delay={3000}>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default CustomAlert;
