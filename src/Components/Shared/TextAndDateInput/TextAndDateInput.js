import React from 'react';
import styles from './textAndDateInput.module.css';

const TextAndDateInput = ({ label, id, name, value, placeholder, onChange, required, type }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        className={styles.textAndDateInput}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextAndDateInput;
