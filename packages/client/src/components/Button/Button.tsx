import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import styles from './Button.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: IconDefinition
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = 'button',
  icon,
  ...rest
}) => {
  const buttonClass = `${styles.button} ${className ? className : ''}`.trim()

  return (
    <button {...rest} type={type} className={buttonClass} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} size='lg'/>}
      {label}
    </button>
  )
}

export default Button
