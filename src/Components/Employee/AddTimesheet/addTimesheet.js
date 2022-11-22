import React from 'react';
import tableStyles from '../../Shared/Table/index.module.css';

const AddTimesheet = ({ data, headers, hours }) => {
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
                <tr className={tableStyles.tr} key={row._id}>
                  {headers.map((header, index) => {
                    return (
                      <>
                        <td key={index}>{row[header]}</td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
          <tr className={tableStyles.tr}>
            <td>Total Hours</td>
            <td></td>
            <td>{hours}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddTimesheet;
