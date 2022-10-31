import styles from './modalDelete.module.css';

const TimesheetDeleter = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Do you really want to delete this Timesheet?</h2>
        <div className={styles.buttonContainer}>
          <button onClick={props.closeModal} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={props.handleDelete} className={styles.deleteBtn}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimesheetDeleter;
