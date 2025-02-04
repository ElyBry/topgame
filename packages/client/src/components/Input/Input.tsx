import styles from "./Input.module.css";
import { useState } from 'react';

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  modelValue?: string;
	onChange?: (e: Event) => void;
	onBlur?: (e: Event) => void;
	onFocus?: (e: Event) => void;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, modelValue, onBlur, onFocus, onChange }) => {
	const [value, setValue] = useState(modelValue || '');

	const handleChange = (event) => {
		setValue(event.target.value)
		onChange && onChange(event)
	}

  return <input className={styles.input} type={type} name={name} placeholder={placeholder} value={value} onChange={handleChange} onBlur={onBlur} onFocus={onFocus}/>;
};

export default Input;
