import { useCallback, useEffect, useRef, useState } from 'react'
import WrapperBgColor from '../../../components/WrapperBgColor/WrapperBgColor'
import SubTitle from '../../../components/SubTitle/SubTitle'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import Leaderboard from '../../../components/Leaderboard/Leaderboard'

export const LeaderboardPage= () => {
  useEffect(() => {
    const currentTitle = document.title;
  
    if (!currentTitle.includes("Лидерборд")) {
      document.title = `Лидерборд - ${currentTitle}`
    }

    return () => {
      document.title = currentTitle;
    };
  }, [])

  return (
    <>
      <PageWrapper layout="alternative" showNav={true} lightColor={true}>
        <WrapperBgColor title="Таблица лидеров по рейтингу">
          <SubTitle text="Топ лучших игроков по рейтингу" />

          <Leaderboard />
        </WrapperBgColor>
      </PageWrapper>
    </>
  )
}
