import Button from '../../../components/Button/Button'
import { ROUTES } from '../../../utils/routes'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleNavigateToMain = () => {
    navigate(ROUTES.MAIN)
  }

  return (
    <NotFoundStyle>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <meta name="description" content="Страница не найдена"/>
      </Helmet>

      <NotFoundNumberStyle>400</NotFoundNumberStyle>
      <NotFoundTextStyle>Не туда попали</NotFoundTextStyle>
      <Button
        label="На главную страницу"
        type="button"
        onClick={handleNavigateToMain}
      />
    </NotFoundStyle>
  )
}

const NotFoundStyle = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NotFoundNumberStyle = styled.h1`
    font-size: 40px;
    margin-bottom: 20px;
`;

const NotFoundTextStyle = styled.p`
    font-size: 20px;
    margin-bottom: 69px;
`;

export const initNotFoundPage = () => Promise.resolve()