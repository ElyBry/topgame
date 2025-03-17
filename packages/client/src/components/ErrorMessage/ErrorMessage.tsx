import styled from 'styled-components'

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorMessageStyle>{message}</ErrorMessageStyle>;
};

const ErrorMessageStyle = styled.div`
    font-size: 1rem;
    line-height: 1rem;
    color: var(--error-color);
    padding: 7px 0 0;
`;

export default ErrorMessage;
