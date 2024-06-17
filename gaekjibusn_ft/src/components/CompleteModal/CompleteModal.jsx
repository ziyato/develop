import React from 'react';
import './CompleteModal.css';

const CompleteModal = ({ isModalOpen, message, onClose }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CompleteModal;