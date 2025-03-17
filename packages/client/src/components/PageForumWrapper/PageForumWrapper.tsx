import styled from 'styled-components'

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <ForumPageStyle>
      <ForumHeaderStyle></ForumHeaderStyle>
      <ForumContentStyle>
        {children}
      </ForumContentStyle>
    </ForumPageStyle>
  );
};

const ForumPageStyle = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ForumHeaderStyle = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        background: url(./i/chess-bg.jpg) 0% 95% no-repeat var(--text-color);
        background-size: cover;
        filter: grayscale(80%) blur(3px) contrast(1.2);
    }
`;

const ForumContentStyle = styled.div`
    padding: 40px 20px 40px 20px;
    max-width: 900px;
`;

export default PageWrapper;
