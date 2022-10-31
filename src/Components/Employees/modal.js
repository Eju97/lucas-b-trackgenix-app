import styles from './modal.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  const onCloseModal = () => {
    props.onCloseModal();
    props.closeModal();
  };
  const closeModal = () => {
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <button onClick={closeModal}>Close</button>
        <button onClick={onCloseModal}>Confirm</button>
      </div>
    </div>
  );
}

export default Modal;
