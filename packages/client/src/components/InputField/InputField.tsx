/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input } from '../Input'
import { ErrorMessage } from '../ErrorMessage'
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

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
    <FieldsetStyle>
      <InputWrapperStyle>
        <Input {...rest} type={type} name={name} placeholder={placeholder} />
      </InputWrapperStyle>

      {/* Отображаем ошибку, если она есть */}
      {error && message && <ErrorMessage message={message} />}
    </FieldsetStyle>
  )
}

const FieldsetStyle = styled.div`
    margin: 16px 0 0
`;

const InputWrapperStyle = styled.div`
    display: block;
    position: relative
`;

export default InputField
