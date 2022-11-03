import styles from './modal.module.css';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <h3>Delete Task</h3>
        </div>
        <p>Are you sure you want to delete task?</p>
        <div className={styles.buttonContainer}>
          <button onClick={props.closeModal} className={styles.buttonClose}>
            Close
          </button>
          <button onClick={props.handleDelete} className={styles.buttonDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
