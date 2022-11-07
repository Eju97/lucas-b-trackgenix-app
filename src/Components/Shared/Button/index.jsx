import styles from './button.module.css';

const Button = ({ type, onClick, variant, name }) => {
  return (
    <button type={type ? type : 'button'} className={`${styles[variant]}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
