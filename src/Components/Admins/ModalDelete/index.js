import styles from './modalDelete.module.css';

const DeleteConfirmationModal = ({ adminDelete, closeModal, showModal }) => {
  const onCloseModal = () => {
    adminDelete();
    closeModal();
  };
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Do you really want to delete this Admin?</h2>
        <div className={styles.buttonContainer}>
          <button onClick={closeModal} className={styles.close}>
            Cancel
          </button>
          <button onClick={onCloseModal} className={styles.close}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
