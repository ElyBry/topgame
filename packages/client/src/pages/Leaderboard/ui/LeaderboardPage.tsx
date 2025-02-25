import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import SubTitle from '../../../components/SubTitle/SubTitle'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import Leaderboard from '../../../components/Leaderboard/Leaderboard'

export const LeaderboardPage: React.FC = () => {
  return (
    <>
      <PageWrapper layout="alternative" showNav={true} lightColor={true}>
        <WrapperBgColor title="Таблица лидеров по рейтингу">
          <SubTitle text="Топ лучших игроков по рейтингу" />

          <Leaderboard/>
        </WrapperBgColor>
      </PageWrapper>
    </>
  )
}
