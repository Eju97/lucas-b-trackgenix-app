import React from 'react';
import styles from './input.module.css';

const Input = ({ register, label, id, name, placeholder, required, type, error }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        {...register(name, { required: { value: true, message: 'Field is required' } })}
        className={styles.input}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
