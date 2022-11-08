import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, isOpen, handleClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
