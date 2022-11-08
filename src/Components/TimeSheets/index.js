import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import DeleteConfirmationModal from './ModalDelete/modalDelete';
// import { useHistory } from 'react-router-dom';
import Table from '../Shared/Table';

const TimeSheets = () => {
  // const history = useHistory();
  const urlForm = '/time-sheets/form/';
  const [timesheets, setTimesheet] = useState([]);
  const [timesheetId, setTimesheetId] = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        setTimesheet(response.data);
      });
  }, []);

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const timeSheetData = () => {
    return timesheets.map((timesheet) => {
      return {
        ...timesheet,
        date: dateFormatted(timesheet.date),
        task: !timesheet.task ? (
          <p className={styles.none}>There is no task</p>
        ) : (
          timesheet.task.description
        ),
        employee: `${timesheet.employee.name} ${timesheet.employee.lastName}`,
        project: !timesheet.project ? (
          <p className={styles.none}>There is no project</p>
        ) : (
          timesheet.project.name
        )
      };
    });
  };

  const deleteTimesheet = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!data.error) {
      setTimesheet([...timesheets.filter((timesheet) => timesheet._id !== id)]);
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
      {/* {timesheets.length > 0 ? ( */}
      <Table
        data={timeSheetData()}
        headers={['description', 'date', 'hours', 'project', 'employee', 'task', 'delete']}
        deleteId={setTimesheetId}
        showModal={setShowModal}
        setData={setTimesheet}
        urlForm={urlForm}
      />
      {/* <table>
            <thead className={styles.theadContainer}>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Project</th>
                <th>Employee</th>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            {timesheets.map((timesheet) => {
              return (
                <tbody key={timesheet._id} className={styles.tbodyContainer}>
                  <tr onClick={() => history.push(`/time-sheets/form/${timesheet._id}`)}>
                    <td>{timesheet.description}</td>
                    <td>{dateFormatted(timesheet.date)}</td>
                    <td>{timesheet.hours}</td>
                    <td>
                      {!timesheet.project ? (
                        <p className={styles.none}>There is no project</p>
                      ) : (
                        timesheet.project.name
                      )}
                    </td>
                    <td>
                      {!timesheet.employee ? (
                        <p className={styles.none}>There is no employee</p>
                      ) : (
                        timesheet.employee.name
                      )}
                    </td>
                    <td>
                      {!timesheet.task ? (
                        <p className={styles.none}>There is no task</p>
                      ) : (
                        timesheet.task.description
                      )}
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTimesheetId(timesheet._id);
                          setShowModal(true);
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button type="button" onClick={() => history.push('/time-sheets/form')}>
            Add a new Timesheet
          </button> */}
      <DeleteConfirmationModal
        showModal={showModal}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
      {/* ) : ( */}
      {/* <h3>Loading Timesheets...</h3> */}
      {/* )} */}
    </section>
  );
};

export default TimeSheets;
