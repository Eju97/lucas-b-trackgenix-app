import React from 'react';
import styles from './input.module.css';

const Input = ({ label, id, name, value, placeholder, onChange, required, type }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        className={styles.input}
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

export default Input;
