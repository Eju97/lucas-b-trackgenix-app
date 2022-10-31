import styles from './modalDelete.module.css';
const TimesheetDeleter = (props) => {
  console.log(props.timesheetId);
  const handleDelete = () => {
    props.handleDelete();
    props.closeModal();
  };
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.modalContainer}>
      <h2 className={styles.modalTitle}>Do you really want to delete this Timesheet?</h2>
      <div className={styles.buttonContainer}>
        <button onClick={props.closeModal} className={styles.cancelBtn}>
          Cancel
        </button>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimesheetDeleter;
// deleteTimesheet
// <button onClick={() => deleteTimesheet(timesheet._id)}>X</button>
