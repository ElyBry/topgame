import styles from "./TextareaField.module.css";
import { Textarea } from '../Textarea';
import { ErrorMessage } from '../ErrorMessage';

interface TextareaFieldProps {
  name: string;
  error?: boolean;
  message?: string;
  placeholder: string;
	modelValue?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ name, error, message, placeholder, modelValue }) => {
  return (
    <div className={styles.fieldset}>
      <label className={styles.input_wrapper}>
        <Textarea  name={name} placeholder={placeholder} modelValue={modelValue}/>
      </label>

      {/* Отображаем ошибку, если она есть */}
      {error && message && <ErrorMessage message={message} />}
    </div>
  );
};

export default TextareaField;
