import React from 'react';
import styles from './index.module.css';
import Logo from '../Assets/logoDelete.png';
import { useHistory } from 'react-router-dom';

const Table = ({ data, headers, urlForm, showModal, deleteId }) => {
  console.log(data);
  const history = useHistory();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return (
              <th key={index} className={styles.tCell}>
                {header}
              </th>
            );
          })}
          <th />
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((row) => {
          return (
            <>
              <tr key={row._id} onClick={() => history.push(`${urlForm}${row._id}`)}>
                {headers.map((header, index) => {
                  return (
                    <>
                      <td key={index} className={styles.tCell}>
                        {row[header]}
                      </td>
                    </>
                  );
                })}
                <td className={styles.tCell}>
                  <img
                    src={Logo}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteId(row._id);
                      showModal(true);
                    }}
                  />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
      <tbody>
        <button type="button" onClick={() => history.push(urlForm)}>
          Create
        </button>
      </tbody>
    </table>
  );
};

export default Table;
