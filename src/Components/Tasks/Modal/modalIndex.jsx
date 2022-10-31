import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  //   const onCloseModal = () => {
  //     props.onCloseModal();
  //   };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Delete Task</h3>
        <button onClick={props.closeModal}>Close</button>
        <button onClick={props.handleDelete}>Delete</button>
      </div>
    </div>
  );
}
export default Modal;
