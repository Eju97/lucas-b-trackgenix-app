import styles from './button.module.css';

const Button = ({ type, onClick, variant, name }) => {
  return (
    <button type={type ? type : 'button'} className={`${styles[variant]}`} onClick={onClick}>
      <span>{name}</span>
    </button>
  );
};

export default Button;
