import React from 'react';
import styles from './input.module.css';

const Input = ({ label, id, name, placeholder, type, register, error }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        {...register(name)}
        className={styles.input}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
      {error && <p className={styles.warning}>{error}</p>}
    </div>
  );
};

export default Input;
