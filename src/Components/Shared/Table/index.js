import React from 'react';
import tableStyles from './index.module.css';
import Logo from '../Assets/logoDelete.png';
// import { useHistory } from 'react-router-dom';

// urlForm, deleteId, showModal

const Table = ({ data, headers, onDelete, onRowClick }) => {
  // const history = useHistory();
  return (
    <div>
      <table>
        <thead>
          <tr className={tableStyles.trHeader}>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th />
          </tr>
        </thead>
        <tbody className={tableStyles.tbody}>
          {data.map((row) => {
            return (
              <>
                <tr className={tableStyles.tr} key={row._id} onClick={() => onRowClick(row._id)}>
                  {headers.map((header, index) => {
                    return (
                      <>
                        <td key={index}>{row[header]}</td>
                      </>
                    );
                  })}
                  <td>
                    <img
                      className={tableStyles.logo}
                      src={Logo}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row._id, true);
                      }}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
