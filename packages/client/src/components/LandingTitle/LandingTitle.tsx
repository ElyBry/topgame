import styled from 'styled-components'

type LandingTitleProps = {
  title: string;
};

const LandingTitle: React.FC<LandingTitleProps> = ({ title }) => {
  return (
    <LandingTitleStyle>
      {title}
    </LandingTitleStyle>
  );
};

const LandingTitleStyle = styled.div`
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 100%;
    margin: 0 0 15px;
`;

export default LandingTitle;
