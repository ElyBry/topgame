import { useState, useEffect } from 'react'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import PageWrapperNotBg from '../../../components/PageWrapperNotBg/PageWrapperNotBg'
import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import SubTitle from '../../../components/SubTitle/SubTitle'
import stylesButton from '../../../components/Button/Button.module.css'
import Button from '../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'
import { useAppSelector } from '../../../store/hooks'
import { COLORS } from '../../../utils/constants'
import { resetWinnerColor } from '../../../store/slice/gameSlice'
import { useAppDispatch } from '../../../store/hooks'

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
    <PageWrapper layout="alternative" showNav={true}>
      <PageWrapperNotBg>
        <WrapperBgColor title={title}>
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
