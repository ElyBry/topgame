import Header from '../../../components/Header/Header'
import PageWrapperNotBg from '../../../components/PageWrapperNotBg/PageWrapperNotBg'
import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import Switch from '../../../components/Switch/Switch'
import SubTitle from '../../../components/SubTitle/SubTitle'
import stylesButton from "../../../components/Button/Button.module.css";
import Button from '../../../components/Button/Button'

export const StartGame = () => {
  return (
    <>
      <Header/>
      <PageWrapperNotBg>
        <WrapperBgColor title="Играть в шахматы с другом на одном компьютере">
          <SubTitle text="Выбрать сторону для авторизованного пользователя" />
          <Switch data={[
            {
              'name': 'Белые',
              'src': '/src/pages/StartGame/ui/i/white.svg'
            },
            {
              'name': 'Случайный выбор',
              'src': '/src/pages/StartGame/ui/i/random.svg'
            },
            {
              'name': 'Чёрные',
              'src': '/src/pages/StartGame/ui/i/black.svg',
            }
          ]} />

          <SubTitle text="Минут на партию" />
          <Switch style="width_auto" data={[
            { 'name': '∞' },
            { 'name': '10' },
            { 'name': '20' },
            { 'name': '30' },
            { 'name': '40' },
            { 'name': '50' },
            { 'name': '60' }
          ]} />

          <Button
            label="Начать игру!"
            className={`${stylesButton.button_width_auto} ${stylesButton.button_left}`}
          />
        </WrapperBgColor>
      </PageWrapperNotBg>
    </>
  )
}
