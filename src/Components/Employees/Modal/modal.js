import styles from './modal.module.css';

const DeleteConfirmationModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <button onClick={props.closeModal}>Close</button>
        <button onClick={props.onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
