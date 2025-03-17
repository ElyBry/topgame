import styled from 'styled-components'

const LandingCopy = () => {

  return (
    <LandingCopyStyle>
      <h2>Добро пожаловать в <LandingNameStyle>Chessify</LandingNameStyle>!</h2>
      <p>Готовы проверить свои стратегические навыки? В Chessify вы сможете бросить вызов своему разуму и погрузиться в&nbsp;мир шахмат. Сразитесь с&nbsp;друзьями, применяя логику и&nbsp;стратегию, чтобы поставить мат своему противнику.</p>
      <p><b>Присоединяйтесь к игре и покажите, кто здесь настоящий мастер шахмат!</b></p>
    </LandingCopyStyle>
  )
}

const LandingCopyStyle = styled.div`
    font-size: 1.4rem;
    line-height: 130%;
    
    & h2 {
        font-size: 2.4rem;
        font-weight: 600;
        line-height: 130%;
        margin: 0 0 15px;
    }
    
    & p {
        margin: 0 0 10px;
    }
`;

const LandingNameStyle = styled.span`
    font-family: var(--lobster-font);
    font-weight: 400;
`;

export default LandingCopy
