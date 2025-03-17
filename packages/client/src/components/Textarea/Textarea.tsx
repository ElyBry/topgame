import { useState } from 'react';
import styled from 'styled-components'

interface TextareaProps {
  name: string;
  placeholder?: string;
  modelValue?: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, placeholder, modelValue }) => {
  const [value, setValue] = useState(modelValue || '');

  return <TextareaStyle name={name} placeholder={placeholder} value={value} onChange={(event) => setValue(event.target.value)}/>;
};

const TextareaStyle = styled.textarea`
      display: block;
      border: 1px solid var(--input-ele-bg);
      border-radius: 5px;
      background: var(--input-ele-bg);
      width: 100%;
      height: 35px;
      padding: 10px 15px;
      font: 1.3rem/1.3rem var(--inter-font);
      color: var(--text-color);
      height: 150px;
      resize: none;
      overflow: auto;

    &:focus {
        background-color: var(--box-bg);
        border-color: var(--input-ele-border);
    }

    &:focus::placeholder {
        opacity: 0;
    }
`;

export default Textarea;
