import Header from "../Header/Header";
import styled from 'styled-components'

interface PageMainWrapperProps {
  children: React.ReactNode;
  showNav: boolean;
  lightColor: boolean;
}

const PageMainWrapper: React.FC<PageMainWrapperProps> = ({ children, showNav, lightColor }) => {
  return (
    <>
    <MainStyle>
      <Header showNav={showNav} lightColor={lightColor} />
      <WrapStyle>
        {children}
        <FooterStyle>
          <FooterFixedStyle>
            © 2025 Ваша команда. Все права защищены.
          </FooterFixedStyle>
        </FooterStyle>
      </WrapStyle>
    </MainStyle>
    </>
  )
}

const MainStyle = styled.div`
    height: 100%;
    position: relative;
`;

const WrapStyle = styled.div`
    min-height: 100%;
`;

const FooterStyle = styled.div`
    padding: 30px 0;
    background: var(--footer-bg);
    color: var(--btn-color);
    font-size: 1.6rem;
    line-height: 1.2rem;
`;

const FooterFixedStyle = styled.div`
    width: 950px;
    margin: 0 auto;
    padding: 0 20px;
`;

export default PageMainWrapper