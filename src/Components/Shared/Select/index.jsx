import React from 'react';
import styles from './select.module.css';

const Select = ({ name, value, onChange, label, data }) => {
  return (
    <select
      name={name}
      onChange={(event) => onChange(event)}
      value={value}
      className={styles.select}
    >
      <option hidden value="">
        {label}
      </option>
      {data.map((item, index) => {
        return !item ? (
          <option disabled className={styles.none}>
            There is no {label} available
          </option>
        ) : (
          <option key={index} value={item.id}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
};
export default Select;
