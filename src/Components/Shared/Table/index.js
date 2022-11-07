import React from 'react';
import styles from './index.module.css';

const Table = ({ data, headers }) => {
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
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((row) => {
          return (
            <>
              <tr key={row.id}>
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
                  <img src="../Assets/logo-png.png" />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
      <tbody>
        <button type="button" onClick={() => window.location.assign(`/admins/form?`)}>
          Create
        </button>
      </tbody>
    </table>
  );
};

export default Table;
