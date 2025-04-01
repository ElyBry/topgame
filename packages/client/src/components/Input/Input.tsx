import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: string
  name: string
  placeholder?: string
  modelValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  name,
  placeholder,
  modelValue,
  onChange,
  ...rest
}) => {
  return (
    <input
      {...rest}
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      value={modelValue}
      onChange={onChange}
    />
  )
}

export default Input
