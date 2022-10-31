import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  const onConfirmModal = () => {
    props.onConfirmModal();
    props.closeModal();
  };

  return (
    <div className={`${styles.modal} ${styles.isOpen}`}>
      <div className={styles.containerModal}>
        <button className={styles.close} onClick={props.closeModal}>
          X
        </button>
        <h3>Are you sure you want to delete the project?</h3>
        <button onClick={onConfirmModal}>Accept</button>
        <button onClick={props.closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
