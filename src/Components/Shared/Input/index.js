import React from 'react';
import styles from './input.module.css';

const Input = ({ register, label, id, name, placeholder, required, type, error }) => {
  return (
    <div className={styles.group}>
      <input
        {...register(name, { required: { value: true, message: 'Field is required' } })}
        className={styles.input}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      <span className={styles.highlight}></span>
      <span className={styles.bar}></span>
      <label className={styles.label}>{label}</label>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
