import Header from "../Header/Header";
import styled, { css } from 'styled-components'
import before from './i/chess-bg.png';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  layout?: "default" | "alternative";
  showNav: boolean;
  lightColor: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, title, layout = "default", showNav, lightColor }) => {
  return (
    <>
    <MainStyle>
      <BgStyle $layout={layout}></BgStyle>
      <Header showNav={showNav} lightColor={lightColor} />
      <WrapStyle $layout={layout}>
        <FormStyle $layout={layout}>
          {title && <TitleH2Style $layout={layout}>{title}</TitleH2Style>}
          {children}
        </FormStyle>
      </WrapStyle>
    </MainStyle>
    </>
  )
}

const MainStyle = styled.main`
    height: 100%;
    position: relative;
`;

const BgAlternativeStyle = css `
    width: 100%;
    height: 320px;
    position: relative;
    
    &:after {
        top: auto;
        right: auto;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
    }
`;

const BgStyle = styled.div<{ $layout: string | undefined }>`
    width: 55%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        background: url(${before}) 50% 50% no-repeat var(--text-color);
        background-size: cover;
        filter: grayscale(80%) blur(0px) contrast(1.2);
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 150px;
        height: 100%;
        background: linear-gradient(to left top, transparent 50%, white 50%);
        transform: rotate(-180deg);
    }

    ${(props) => props.$layout !== 'default' ? BgAlternativeStyle : ''}
`;

const WrapAlternativeStyle = css `
    justify-content: center;
    align-items: flex-start;
    min-height: auto;
`;

const WrapStyle = styled.div<{ $layout: string | undefined }>`
    min-height: 100%;
    width: 950px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
    ${(props) => props.$layout !== 'default' ? WrapAlternativeStyle : ''}
`;

const FormAlternativeStyle = css `
    width: 100%;
`;

const FormStyle = styled.div<{ $layout: string | undefined }>`
    width: 340px;
    ${(props) => props.$layout !== 'default' ? FormAlternativeStyle : ''}
`;

const TitleH2AlternativeStyle = css `
    text-align: center;
`;

const TitleH2Style = styled.h2<{ $layout: string | undefined }>`
    font-size: 4rem;
    line-height: 100%;
    font-weight: 600;
    margin: 0 0 40px;
    ${(props) => props.$layout !== 'default' ? TitleH2AlternativeStyle : ''}
`;

export default PageWrapper
