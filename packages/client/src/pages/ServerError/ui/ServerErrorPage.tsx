import Button from '../../../components/Button/Button'
import { ROUTES } from '../../../utils/routes'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

export const ServerErrorPage = () => {
  const navigate = useNavigate()

  const handleNavigateToMain = () => {
    navigate(ROUTES.MAIN)
  }

  return (
    <NotFoundStyle>
      <Helmet>
        <meta charSet="utf-8" />
        <title>500: Мы уже фиксим</title>
      </Helmet>

      <NotFoundNumberStyle>500</NotFoundNumberStyle>
      <NotFoundTextStyle>Мы уже фиксим</NotFoundTextStyle>
      <Button
        label="На главную страницу"
        classNames={{ button_link: true }}
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