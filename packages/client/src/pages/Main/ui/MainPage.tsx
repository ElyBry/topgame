import { useEffect } from "react";
import PageMainWrapper from "../../../components/PageMainWrapper/PageMainWrapper";
import MainSection from "../../../components/MainSection/MainSection";
import LandingCopy from "../../../components/LandingCopy/LandingCopy";
import Team from "../../../components/Team/Team";

export const MainPage = () => {
  useEffect(() => {
    const currentTitle = document.title;
  
    if (!currentTitle.includes("Главная")) {
      document.title = `Главная - ${currentTitle}`
    };

    return () => {
      document.title = currentTitle;
    };
  }, [])

  return (
    <>
      <PageMainWrapper showNav={true}>
        <MainSection>
          <LandingCopy />
        </MainSection>
        <MainSection>
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
