import { Textarea } from '../Textarea';
import { ErrorMessage } from '../ErrorMessage';
import styled from 'styled-components'

interface TextareaFieldProps {
  name: string;
  error?: boolean;
  message?: string;
  placeholder: string;
  modelValue?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ name, error, message, placeholder, modelValue }) => {
  return (
    <FieldsetStyle>
      <label>
        <Textarea name={name} placeholder={placeholder} modelValue={modelValue}/>
      </label>

      {/* Отображаем ошибку, если она есть */}
      {error && message && <ErrorMessage message={message} />}
    </FieldsetStyle>
  );
};

const FieldsetStyle = styled.div`
    margin: 16px 0 0
`;

export default TextareaField;
