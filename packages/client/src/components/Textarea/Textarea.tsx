import styles from "./Textarea.module.css";

interface TextareaProps {
  name: string;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, placeholder }) => {
  return <textarea className={styles.textarea} name={name} placeholder={placeholder} />;
};

export default Textarea;
