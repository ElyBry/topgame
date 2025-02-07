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
}

const Input: FC<InputProps> = ({ type, name, placeholder, ...rest }) => {
  return (
    <input
      {...rest}
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}

export default Input
