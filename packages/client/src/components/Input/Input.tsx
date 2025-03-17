import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

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
    <InputStyle
      {...rest}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  )
}

const InputStyle = styled.input`
    display: block;
    border: 1px solid var(--input-ele-bg);
    border-radius: 5px;
    background: var(--input-ele-bg);
    width: 100%;
    height: 35px;
    padding: 0 15px;
    font: 1.3rem/1.3rem var(--inter-font);
    color: var(--text-color);

    &:focus {
        background-color: var(--box-bg);
        border-color: var(--input-ele-border);
    }

    &:focus::placeholder {
        opacity: 0;
    }
`;

export default Input
