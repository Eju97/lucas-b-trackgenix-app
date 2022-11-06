import React from 'react';
import modalstyles from './modal.module.css';
import { useHistory } from 'react-router-dom';

const Modal = ({ contentMessage, title, setShowModal }) => {
  const history = useHistory();
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
                history.push(`/admins`);
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
