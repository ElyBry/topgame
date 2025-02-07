import styles from "./Textarea.module.css";
import { useState } from 'react';

interface TextareaProps {
  name: string;
  placeholder?: string;
  modelValue?: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, placeholder, modelValue }) => {
  const [value, setValue] = useState(modelValue || '');

  return <textarea className={styles.textarea} name={name} placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}/>;
};

export default Textarea;
