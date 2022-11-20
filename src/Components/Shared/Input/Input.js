import React from 'react';
import styles from './input.module.css';

const Input = ({ label, id, name, value, placeholder, onChange, type, register, error }) => {
  console.log('error', error);
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
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.warning}>{error}</p>}
    </div>
  );
};

export default Input;
