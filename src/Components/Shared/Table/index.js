import React from 'react';
import styles from './index.module.css';
import Logo from '../../../assets/logoDelete.png';

const Table = ({ data, headers, onDelete, onRowClick }) => {
  return (
    <div>
      <table className={styles.tableStyle}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th />
          </tr>
        </thead>
        <tbody className={styles.bodyTable}>
          {data.map((row) => {
            if (!row.isDeleted) {
              return (
                <>
                  <tr
                    className={onRowClick ? styles.tr : styles.tr2}
                    key={row._id}
                    onClick={() => onRowClick && onRowClick(row._id)}
                  >
                    {headers.map((header, index) => {
                      return (
                        <>
                          <td key={index}>{row[header]}</td>
                        </>
                      );
                    })}
                    <td>
                      {onDelete && (
                        <img
                          src={Logo}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(row._id, true);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                </>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
