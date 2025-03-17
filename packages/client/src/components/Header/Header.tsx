import Navigation from "../Navigation/Navigation";
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logoPic from './i/logo-chess.jpg';

interface HeaderProps {
  showNav?: boolean;
  lightColor?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNav, lightColor }) => {
  return (
    <HeaderStyle>
      <Link to="/">
        <LogoStyle>Chessify</LogoStyle>
      </Link>

      <GameNameStyle $lightColor={lightColor}>Chessify</GameNameStyle>
      {showNav && <Navigation />}
    </HeaderStyle>
  );
};

const GameNameStyle = styled.h1<{ $lightColor: boolean | undefined }>`
    color: ${props => props.$lightColor ? 'var(--secondary-background-color);' : 'var(--text-color)'};
    font-size: 2.2rem;
    font-family: var(--lobster-font), serif;
    font-weight: 400;
    font-style: normal;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
`;

const HeaderStyle = styled.div`
    width: 950px;
    margin: 0 auto;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 16px;
`;

const LogoStyle = styled.span`
    display: block;
    width: 80px;
    height: 80px;
    background: url(${logoPic}) 50% 50% no-repeat;
    background-size: cover;
    border-radius: 15px;
    text-indent: -9999px;
    outline: none;
    overflow: hidden;
`;



export default Header;
