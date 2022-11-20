import React from 'react';
import styles from './input.module.css';

const Input = ({ register, label, id, name, placeholder, onChange, required, type }) => {
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
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
