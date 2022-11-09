import React from 'react';
import styles from './select.module.css';

const Select = ({ name, value, onChange, placeholder, data }) => {
  return (
    <select name={name} onChange={onChange} value={value} className={styles.select}>
      <option hidden value="">
        {placeholder}
      </option>
      {data.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
};
export default Select;
