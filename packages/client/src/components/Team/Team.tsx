import styled from 'styled-components'

interface TeamProps {
  pic: string;
  h4: string;
  copy: string;
}

const Team: React.FC<TeamProps> = ({ pic, h4, copy }) => {
  return (
    <TeamStyle>
      <PicStyle>{pic}</PicStyle>
      <div>
        <H4Style>{h4}</H4Style>
        <p>{copy}</p>
      </div>
    </TeamStyle>
  )
}

const TeamStyle = styled.div`
    margin: 0 0 15px;
    display: flex;
    align-items: center;
    gap: 0 16px;
    font-size: 1.4rem;
    line-height: 130%;
`;

const PicStyle = styled.div`
    width: 60px;
    height: 60px;
    background: var(--avatar-ele-bg);
    border-radius: var(--border-radius);
`;

const H4Style = styled.div`
    font-size: 1.5rem;
    line-height: 130%;
    margin: 0 0 5px;
`;

export default Team
