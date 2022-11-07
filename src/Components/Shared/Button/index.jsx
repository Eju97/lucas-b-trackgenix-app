import styles from './button.module.css';

const Buttons = ({ type, action, variant, name }) => {
  return (
    <button type={type ? type : 'button'} className={`${styles[variant]}`} onClick={action}>
      {name}
    </button>
  );
};

export default Buttons;
