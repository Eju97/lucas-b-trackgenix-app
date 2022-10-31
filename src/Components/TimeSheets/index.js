import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import DeleteConfirmationModal from './ModalDelete/modalDelete';

const TimeSheets = () => {
  const [timesheets, saveTimesheet] = useState([]);
  const [timesheetId, setTimesheetId] = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        saveTimesheet(response.data);
      });
  }, []);

  const deleteTimesheet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!data.error) {
      saveTimesheet([...timesheets.filter((timesheet) => timesheet._id !== id)]);
    }
  };

  const handleDelete = () => {
    deleteTimesheet(timesheetId);
    closeModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      {timesheets.length > 0 ? (
        <>
          <table>
            <thead className={styles.theadContainer}>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Tasks</th>
                <th>Project</th>
                <th>Employee</th>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            {timesheets.map((timesheet) => {
              return (
                <tbody key={timesheet._id} className={styles.tbodyContainer}>
                  <tr>
                    <td>{timesheet.description}</td>
                    <td>{timesheet.date}</td>
                    <td>{timesheet.hours}</td>
                    <td>{timesheet.tasks}</td>
                    <td>{timesheet.project.name}</td>
                    <td>{timesheet.employee.name}</td>
                    <td>{timesheet.task.description}</td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        setTimesheetId(timesheet._id);
                        setShowModal(true);
                      }}
                    >
                      X
                    </button>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <a href="/time-sheets/form">Add</a>
          <DeleteConfirmationModal
            showModal={showModal}
            closeModal={closeModal}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        <h3>There are no Timesheets</h3>
      )}
    </section>
  );
};

export default TimeSheets;
