import styled from 'styled-components'

const PageWrapperNotBg: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <WrapperStyle>{children}</WrapperStyle>
  );
};

const WrapperStyle = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 950px;
    padding: 20px;
    min-height: calc(100vh - 225px);
    display: flex;
    align-items: center;
`;

export default PageWrapperNotBg;
