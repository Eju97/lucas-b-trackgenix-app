import styles from './modal.module.css';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>You sure want to delete it?</h3>
        <button onClick={props.closeModal}>Close</button>
        <button onClick={props.handleDelete}>Delete</button>
      </div>
    </div>
  );
}
export default Modal;
