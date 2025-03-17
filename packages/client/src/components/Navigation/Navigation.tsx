import { ROUTES } from "../../utils/routes";
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components'

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => (location.pathname === path);

  return (
    <NavStyle>
      <NavListStyle>
        <li>
          <Link to={ROUTES.MAIN}>
            <LinkStyle $active={isActive(ROUTES.MAIN)}>Главная</LinkStyle>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.PROFILE}>
            <LinkStyle $active={isActive(ROUTES.PROFILE)}>Профиль</LinkStyle>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.FORUM}>
            <LinkStyle $active={isActive(ROUTES.FORUM)}>Форум</LinkStyle>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.LEADERBOARD}>
            <LinkStyle $active={isActive(ROUTES.LEADERBOARD)}>Лидерборд</LinkStyle>
          </Link>
        </li>
        <li>
          <Link to="#">
            <LinkStyle $logout={true} $active={false}>Выйти</LinkStyle>
          </Link>
        </li>
      </NavListStyle>
    </NavStyle>
  );
};

const NavStyle = styled.nav`
    margin-left: auto;
`;

const NavListStyle = styled.ul`
    display: flex;
    gap: 0 26px;
`;

const LinkLogoutStyle = css `
    background: var(--logout-btn-bg);
    color: var(--btn-color);
    margin-left: 30px;
    
    &:hover {
        background: var(--logout-btn-bg-hover);
        color: var(--btn-color);
    }
`;

const LinkStyle = styled.span<{ $active: boolean, $logout?: true | undefined }>`
    display: block;
    padding: 10px 16px;
    background: var(--nav-bg);
    color: var(--text-color);
    border-radius: 5px;

    color: ${props => props.$active ? 'var(--btn-color);' : ''};
    background: ${props => props.$active ? 'var(--nav-active-bg);' : ''};

    ${(props) => props.$logout ? LinkLogoutStyle : ''}
`;

export default Navigation;
