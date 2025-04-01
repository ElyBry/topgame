import styles from './Textarea.module.css'

interface TextareaProps {
  name: string
  placeholder?: string
  modelValue?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  placeholder,
  modelValue,
  onChange,
}) => {
  return (
    <textarea
      className={styles.textarea}
      name={name}
      placeholder={placeholder}
      value={modelValue}
      onChange={onChange}
    />
  )
}

export default Textarea
