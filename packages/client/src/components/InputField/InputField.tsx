/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './InputField.module.css'
import { Input } from '../Input'
import { ErrorMessage } from '../ErrorMessage'
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

interface InputFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: string
  name: string
  error?: boolean
  message?: string
  placeholder: string
}

const InputField: FC<InputFieldProps> = ({
  type,
  name,
  error,
  message,
  placeholder,
  ...rest
}) => {
  return (
    <div className={styles.fieldset}>
      <label className={styles.input_wrapper}>
        <Input {...rest} type={type} name={name} placeholder={placeholder} />
      </label>

      {/* Отображаем ошибку, если она есть */}
      {error && message && <ErrorMessage message={message} />}
    </div>
  )
}

export default InputField
