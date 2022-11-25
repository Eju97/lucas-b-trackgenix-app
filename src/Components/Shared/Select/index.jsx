import React from 'react';
import styles from './select.module.css';

const Select = ({ name, label, data, register, value, error }) => {
  return (
    <div>
      <select {...register(name)} name={name} value={value} className={styles.select}>
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
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
export default Select;
