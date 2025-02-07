import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import styles from './Button.module.css'
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = 'button',
  ...rest
}) => {
  const buttonClass = `${styles.button} ${className ? className : ''}`.trim()

  return (
    <button {...rest} type={type} className={buttonClass} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
