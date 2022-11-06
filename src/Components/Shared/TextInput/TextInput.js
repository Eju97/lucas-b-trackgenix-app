import React from 'react';
import styles from './textInput.module.css';

const TextInput = ({ label, id, name, value, placeholder, onChange, required, type }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        className={styles.TextInput}
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

export default TextInput;
