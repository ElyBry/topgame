import styled from 'styled-components'
import { keyframes } from 'styled-components'

const Loader = () => {
  return <LoaderStyle></LoaderStyle>;
};

export const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const LoaderStyle = styled.div`
    border: 4px solid var(--loader-bg);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border-left-color: var(--loader-color);
    animation: ${spin} 1s linear infinite;
    margin: 0 auto;
`;

export default Loader;
