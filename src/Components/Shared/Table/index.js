import React from 'react';
import styles from './index.module.css';
import Logo from '../Assets/logoDelete.png';
// import { useHistory } from 'react-router-dom';

const Table = ({ data, headers }) => {
  // const history = useHistory();
  // console.log(data);
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
              <tr key={row.id} /* onClick={() => history.push(`/admins/form/${data._id}`)} */>
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
                  <img src={Logo} />
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
