import styled from 'styled-components'
import img1 from './i/bg.webp';
import img2 from './i/el.png';

interface WrapperBgColorProps {
  children: React.ReactNode;
  title: string;
}

const WrapperBgColor: React.FC<WrapperBgColorProps> = ({ children, title }) => {
  return (
    <WrapperColorStyle>
      <WrapperTitleStyle>{title}</WrapperTitleStyle>
      {children}
    </WrapperColorStyle>
  );
};

const WrapperColorStyle = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  padding: 40px;
  border-radius: 20px;
  background: url(${img1}) bottom right/cover #f3f3f3 no-repeat;
  box-shadow: 0 3px 5px 0 #ecebe9;

  &:after {
      content: '';
      position: absolute;
      top: -50px;
      right: 60px;
      width: 70px;
      height: 70px;
      background: url(${img2}) 50% 50%/contain no-repeat;
  }
`;

const WrapperTitleStyle = styled.h1`
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    margin-bottom: 35px;
    text-transform: uppercase;
`;

export default WrapperBgColor
