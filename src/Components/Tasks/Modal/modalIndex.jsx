import styles from './modal.module.css';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Delete Task</h3>
        <button onClick={props.closeModal}>Close</button>
        <button
          onClick={() => {
            props.showModal;
            props.handleDelete(props.listTask._id);
            props.closeModal;
            setTimeout(function () {
              alert(`${props.listTask.description} deleted!`);
            }, 20);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default Modal;
