import styles from "./Input.module.css";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder }) => {
  return <input className={styles.input} type={type} name={name} placeholder={placeholder} />;
};

export default Input;
