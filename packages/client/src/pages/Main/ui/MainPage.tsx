import { useEffect } from "react";
import PageMainWrapper from "../../../components/PageMainWrapper/PageMainWrapper";
import MainSection from "../../../components/MainSection/MainSection";
import LandingCopy from "../../../components/LandingCopy/LandingCopy";
import HowToPlay from "../../../components/HowToPlay/HowToPlay";
import LandingTitle from "../../../components/LandingTitle/LandingTitle";
import Team from "../../../components/Team/Team";

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
        <MainSection>
          <LandingCopy />
        </MainSection>
        <MainSection>
          <LandingTitle title="Как играть" />
          <HowToPlay />
        </MainSection>
        <MainSection>
          <LandingTitle title="Команда проекта" />
          <Team pic="pic-EL.png" h4="Егор Лазарев" copy="Амбассадор Б.Ю. Александров" />
          <Team pic="pic-EE.png" h4="Егор Ермаков" copy="Пока делал движок шахмат, научился&nbsp;играть в&nbsp;них" />
          <Team pic="pic-DM.png" h4="Джулия Мухаметова" copy="Люблю Vue&nbsp;3, React, TypeScript и&nbsp;всё,&nbsp;что делает веб лучше" />
          <Team pic="pic-AY.png" h4="Антон Юдин" copy="Пошёл в&nbsp;IT, чтобы делать игры —&nbsp;и&nbsp;вот, спустя 8&nbsp;лет, сделал первую" />
          <Team pic="pic-EI.png" h4="Екатерина Якушевская" copy="Люблю делать красиво, чтобы и&nbsp;код, и&nbsp;интерфейс радовали глаз" />
          <Team pic="pic-DV.png" h4="Денис Вакуленко" copy="React + TS = любовь" />
        </MainSection>
      </PageMainWrapper>
    </>
  );
};
