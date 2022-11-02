import styles from './modalWarning.module.css';

const ModalWarning = ({ title, contentMessage, showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h1>{title}</h1>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className={styles.btnClose}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/icon-close.svg`} />
            </button>
            <div className={styles.modalBody}>
              <h2>{contentMessage}</h2>
              <button
                onClick={() => {
                  location.replace('http://localhost:3000/super-admins');
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ModalWarning;
