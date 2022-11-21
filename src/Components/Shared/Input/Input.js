import React from 'react';
import styles from './input.module.css';

const Input = ({ label, id, name, placeholder, required, type, register, error }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        {...register(name)}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
