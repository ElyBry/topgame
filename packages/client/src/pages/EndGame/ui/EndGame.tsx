import { useState, useEffect } from 'react'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import PageWrapperNotBg from '../../../components/PageWrapperNotBg/PageWrapperNotBg'
import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import SubTitle from '../../../components/SubTitle/SubTitle'
import Button from '../../../components/Button/Button'
import { ROUTES } from '../../../utils/routes'
import { useAppSelector } from '../../../store/hooks'
import { COLORS } from '../../../utils/constants'
import { resetWinnerColor } from '../../../store/slice/gameSlice'
import { useAppDispatch } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

export const EndGame: React.FC = () => {
  const navigate = useNavigate()
	const dispatch = useAppDispatch()

  const handleNavigateToStartGame = () => {
    navigate(ROUTES.START_GAME)
    dispatch(resetWinnerColor())
  }

  const { winner, settings } = useAppSelector(state => state.gameSlice)

  const [title, setTitle] = useState('Игра окончена: Ничья')

  useEffect(() => {
    if (winner === COLORS.BLACK) {
      setTitle('Игра окончена: Победа черных')
    } else if (winner === COLORS.WHITE) {
      setTitle('Игра окончена: Победа белых')
    }
  }, [winner, settings])

  return (
    <PageWrapper layout="alternative" showNav={true} lightColor={true}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Игра завершена - Chessify</title>
      </Helmet>

      <PageWrapperNotBg>
        <WrapperBgColor title={title}>
          <SubTitle text="Можно сыграть ещё раз" />
          <Button
            label="Начать!"
            classNames={{ button_width_auto: true, button_left: true }}
            onClick={handleNavigateToStartGame}
          />
        </WrapperBgColor>
      </PageWrapperNotBg>
    </PageWrapper>
  )
}
