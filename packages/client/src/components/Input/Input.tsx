import styles from "./Input.module.css";
import { useState } from 'react';

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  modelValue?: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, modelValue }) => {
  const [value, setValue] = useState(modelValue || '');

  return <input className={styles.input} type={type} name={name} placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}/>;
};

export default Input;
