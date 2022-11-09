import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';

const TimeSheets = () => {
  const history = useHistory();
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
        employee: !timesheet.employee ? (
          <p className={styles.none}>There is no employee</p>
        ) : (
          `${timesheet.employee.name} ${timesheet.employee.lastName}`
        ),
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

  const onDelete = (_id, modalDisplay) => {
    setTimesheetId(_id);
    setShowModal(modalDisplay);
  };

  const onRowClick = (_id) => {
    history.push(`/time-sheets/form/${_id}`);
  };

  return (
    <section className={styles.container}>
      <Modal isOpen={showModal} handleClose={closeModal}>
        <div>
          <h3>Do you really want to delete this Timesheet?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={handleDelete} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <h2>TimeSheets</h2>
      <Table
        data={timeSheetData()}
        headers={['description', 'date', 'hours', 'project', 'employee', 'task', 'delete']}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />
    </section>
  );
};

export default TimeSheets;
