import React from 'react';
import tableStyles from './index.module.css';
import Logo from '../Assets/logoDelete.png';
import { useHistory } from 'react-router-dom';

const Table = ({ data, headers, urlForm, showModal, deleteId }) => {
  const history = useHistory();
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
                <tr
                  className={tableStyles.tr}
                  key={row._id}
                  onClick={() => history.push(`${urlForm}${row._id}`)}
                >
                  {headers.map((header, index) => {
                    return (
                      <>
                        <td key={index}>{row[header]}</td>
                      </>
                    );
                  })}
                  <td>
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
      </table>
      <div className={tableStyles.containterButton}>
        <button
          className={tableStyles.buttonAdd}
          type="button"
          onClick={() => history.push(urlForm)}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Table;
