import Header from '../../../components/Header/Header'
import PageWrapperNotBg from '../../../components/PageWrapperNotBg/PageWrapperNotBg'
import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import SubTitle from '../../../components/SubTitle/SubTitle'
import stylesButton from "../../../components/Button/Button.module.css";
import Button from '../../../components/Button/Button'

export const EndGame: React.FC = () => {
  return (
    <>
      <Header/>
      <PageWrapperNotBg>
        <WrapperBgColor title="Игра окончена: Победа белых">
          <SubTitle text="Можно сыграть ещё раз" />
          <Button
            label="Начать!"
            className={`${stylesButton.button_width_auto} ${stylesButton.button_left}`}
          />
        </WrapperBgColor>
      </PageWrapperNotBg>
    </>
  )
}
