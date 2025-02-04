import styles from "./InputField.module.css";
import { Input } from '../Input';
import { ErrorMessage } from '../ErrorMessage';

interface InputFieldProps {
  type: string;
  name: string;
  error?: boolean;
  message?: string;
  placeholder: string;
	modelValue?: string;
	onChange?: (e: Event) => void;
	onBlur?: (e: Event) => void;
	onFocus?: (e: Event) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, error, message, placeholder, modelValue, onBlur, onFocus, onChange }) => {
  return (
    <div className={styles.fieldset}>
      <label className={styles.input_wrapper}>
        <Input type={type} name={name} placeholder={placeholder} modelValue={modelValue} onBlur={onBlur} onFocus={onFocus} onChange={onChange}/>
      </label>

      {/* Отображаем ошибку, если она есть */}
      {error && message && <ErrorMessage message={message} />}
    </div>
  );
};

export default InputField;
