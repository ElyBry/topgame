import { useEffect } from "react";
import PageMainWrapper from "../../../components/PageMainWrapper/PageMainWrapper";
import MainSection from "../../../components/MainSection/MainSection";
import LandingCopy from "../../../components/LandingCopy/LandingCopy";
import HowToPlay from "../../../components/HowToPlay/HowToPlay";
import LandingTitle from "../../../components/LandingTitle/LandingTitle";
import Team from "../../../components/Team/Team";
import { Helmet } from 'react-helmet'

export const MainPage = () => {
  useEffect(() => {
    const currentTitle = document.title;

    if (!currentTitle.includes("Главная")) {
      document.title = `Главная - ${currentTitle}`
    }

    return () => {
      document.title = currentTitle;
    };
  }, [])

  return (
    <>
      <PageMainWrapper showNav={true} lightColor={false}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Добро пожаловать в Chessify!</title>
          <meta name="description" content="Добро пожаловать в Chessify!"/>
        </Helmet>

        <MainSection>
          <LandingCopy />
        </MainSection>
        <MainSection>
          <LandingTitle title="Как играть" />
          <HowToPlay />
        </MainSection>
        <MainSection>
          <LandingTitle title="Команда проекта" />
          <Team pic="" h4="Dev 1" copy="Description" />
          <Team pic="" h4="Dev 2" copy="Description" />
          <Team pic="" h4="Dev 3" copy="Description" />
          <Team pic="" h4="Dev 4" copy="Description" />
          <Team pic="" h4="Dev 5" copy="Description" />
        </MainSection>
      </PageMainWrapper>
    </>
  );
};