import React from 'react';
import styles from './input.module.css';

const Input = ({
  label,
  id,
  name,
  value,
  placeholder,
  onChange,
  required,
  type,
  register,
  error
}) => {
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
        required={required}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;
