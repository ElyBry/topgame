import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import Switch from '../../../components/Switch/Switch'
import SubTitle from '../../../components/SubTitle/SubTitle'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import { SETTING_GAME_DEFAULT, SETTING_GAME_SELECT } from '../../../utils/constants'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import { ROUTES } from '../../../utils/routes'
import { useAppDispatch } from '../../../store/hooks'
import { setGameSettings } from '../../../store/slice/gameSlice'
import {COLORS} from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'

export const StartGame: React.FC = () => {
  const [isSettingTime, setIsSettingTime] = useState(false);
  const [settingsGame, setSettingsGame] = useState(SETTING_GAME_DEFAULT);

  function switchColor(index: number) {
    setSettingsGame({ ...settingsGame, color: SETTING_GAME_SELECT.color[index].color });
  }

  function switchTime(index: number) {
    setSettingsGame({ ...settingsGame, time: SETTING_GAME_SELECT.timePlay[index].time });
    index > 0 ? setIsSettingTime(true) : setIsSettingTime(false);
  }

  function switchTimeMove(index: number) {
    setSettingsGame({ ...settingsGame, addTimeMove: SETTING_GAME_SELECT.timePlayMove[index].time });
  }

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleNavigateToGame = () => {
    const color = settingsGame.color === COLORS.RANDOM ? [COLORS.WHITE, COLORS.BLACK][Math.floor(Math.random() * 2)] : settingsGame.color;
    const opponentColor = color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE
    dispatch(setGameSettings({...settingsGame, color, opponentColor}))
    navigate(ROUTES.GAME);
  }

  return (
    <PageWrapper layout="alternative" showNav={true} lightColor={true}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Играть в шахматы с другом на одном компьютере: начало игры - Chessify</title>
      </Helmet>

      <WrapperBgColor title="Играть в шахматы с другом на одном компьютере">
        <SubTitle text="Выбрать сторону для авторизованного пользователя" />
        <Switch data={SETTING_GAME_SELECT.color} fnAfterClick={switchColor} />

        <SubTitle text="Минут на партию" />
        <Switch isWidthAuto={true} data={SETTING_GAME_SELECT.timePlay} fnAfterClick={switchTime} />

        {isSettingTime && <>
          <SubTitle text="Добавление секунд на ход" />
          <Switch isWidthAuto={true} data={SETTING_GAME_SELECT.timePlayMove} fnAfterClick={switchTimeMove} />
        </>}

        <Button
          label="Начать игру!"
          classNames={{ button_width_auto: true, button_left: true }}
          onClick={handleNavigateToGame}
        />
      </WrapperBgColor>

    </PageWrapper>
  )
}
