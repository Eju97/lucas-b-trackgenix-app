import React from 'react';
import modalstyles from './modal.module.css';

const Modal = ({ contentMessage, title, setShowModal }) => {
  return (
    <>
      <div id="id-modal" className={modalstyles.modal}>
        <header className={modalstyles.header}>
          <h3 className={modalstyles.header__title}>{title}</h3>
          <button
            className={modalstyles.header__button}
            onClick={() => setShowModal(false)}
          ></button>
        </header>
        <div className={modalstyles.content}>
          {contentMessage && <p className={modalstyles.content__message}>{contentMessage}</p>}
          <button
            className={`${modalstyles.options__button} ${modalstyles.options__close}`}
            onClick={() => {
              setShowModal(false);
              if (title !== 'Error') {
                window.location.assign(`/admins`);
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
