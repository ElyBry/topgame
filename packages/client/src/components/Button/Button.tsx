import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string
  onClick?: () => void
  classNames?: Record<string, boolean>
  type?: 'button' | 'submit' | 'reset'
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  classNames,
  type = 'button',
  ...rest
}) => {
  return (
    <ButtonStyle type={type} $classNames={classNames} onClick={onClick}>
      {label}
    </ButtonStyle>
  )
}

const ButtonLeftStyle = css `
    margin-left: 0;
    margin-right: 0;
`;

const ButtonFieldset = css `
    padding: 47px 0 0;
    text-align: center;
    min-height: 112px;
`;

const ButtonSecondary = css `
    background-color: transparent;
    color: var(--text-color-secondary);
    border-color: var(--border-color);
    
    &:hover {
        background-color: var(--secondary-background-color);
    }
`;

const ButtonWidthAuto = css `
    width: auto;
`;

const ButtonLinkStyle = css `
    display: inline-block;
    width: auto;
    background: transparent;
    font-size: 1.2rem;
    line-height: 1.2rem;
    color: var(--link-color);
    padding: 0;
    
    &:hover {
        color: var(--link-color-hover);
        background: transparent;
    }
    
    &:focus {
        box-shadow: none;
    }
`;

const ButtonStyle = styled.button<{ $classNames: any | undefined }>`
    display: block;
    width: 100%;
    max-width: 340px;
    background: var(--btn-ele-bg);
    border: none;
    font: 500 1.3rem/1.3rem var(--inter-font);
    color: var(--btn-color);
    margin: 0 auto;
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.4s ease;
    
    &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
        background: var(--btn-ele-bg-disabled);
    }
    
    &:hover {
        background: var(--btn-ele-bg-hover);
    }
    
    &:disabled:hover {
        background: var(--btn-ele-bg);
    }
    
    &:focus {
        outline: none;
    }

    & + & {
        margin-top: 14px;
    }

    ${(props) => props.$classNames?.button_link ? ButtonLinkStyle : ''}
    ${(props) => props.$classNames?.button_left ? ButtonLeftStyle : ''}
    ${(props) => props.$classNames?.button_fieldset ? ButtonFieldset : ''}
    ${(props) => props.$classNames?.button_secondary ? ButtonSecondary : ''}
    ${(props) => props.$classNames?.button_width_auto ? ButtonWidthAuto : ''}
`;

export default Button
