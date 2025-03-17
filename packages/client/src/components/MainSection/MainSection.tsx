import { PropsWithChildren } from "react";
import styled from 'styled-components'

import bg1 from './i/landing-bg1.jpg'
import bg2 from './i/landing-bg2.jpg'
import bg3 from './i/landing-bg3.jpg'


const MainSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SectionStyle>
      <SectionFixedStyle>
        <SectionColStyle>
          {children}
        </SectionColStyle>
      </SectionFixedStyle>
    </SectionStyle>
  )
}

const SectionColStyle = styled.div`
    width: 50%;
    padding: 0 30px 0 0;
`;

const SectionFixedStyle = styled.div`
    width: 950px;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const SectionStyle = styled.div`
    height: 600px;
    position: relative;
    
    &:first-child {
        padding-top: 120px;
    }
    
    &:before {
        display: block;
        content: "";
        width: 50%;
        height: 100%;
        position: absolute;
        top: 0; right: 0;
        background: url(${bg2}) 50% 50% no-repeat;
        background-size: cover;
    }
    
    &:nth-child(even):before {
        right: auto;
        left: 0;
        background-image: url(${bg3});
        background-position: 50% 10%;
    }

    &:nth-child(even) ${SectionFixedStyle} {
        justify-content: flex-end;
    }

    &:nth-child(even) ${SectionColStyle} {
        padding-left: 30px;
        padding-right: 0;
    }
    
    &:nth-child(3):before {
        background-image: url(${bg1});
        background-position: 50% 10%;
    }
`;

export default MainSection
