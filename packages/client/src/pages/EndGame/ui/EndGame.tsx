import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import PageWrapperNotBg from '../../../components/PageWrapperNotBg/PageWrapperNotBg'
import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import SubTitle from '../../../components/SubTitle/SubTitle'
import stylesButton from "../../../components/Button/Button.module.css";
import Button from '../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'

export const EndGame: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToStartGame = () => {
		navigate(ROUTES.START_GAME);
  }

  return (
    <PageWrapper layout="alternative" showNav={true}>
      <PageWrapperNotBg>
        <WrapperBgColor title="Игра окончена: Победа белых">
          <SubTitle text="Можно сыграть ещё раз" />
          <Button
            label="Начать!"
            className={`${stylesButton.button_width_auto} ${stylesButton.button_left}`}
            onClick={handleNavigateToStartGame}
          />
        </WrapperBgColor>
      </PageWrapperNotBg>
    </PageWrapper>
  )
}
