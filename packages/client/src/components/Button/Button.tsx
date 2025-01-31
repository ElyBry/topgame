import styles from './Button.module.css';

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return <button className={styles.btn}>{label}</button>;
};

export default Button;
