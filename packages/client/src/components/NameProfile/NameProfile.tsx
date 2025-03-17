import styled from 'styled-components'

type NameProfileProps = {
  name: string;
};

const NameProfile: React.FC<NameProfileProps> = ({ name }) => {
  return (
    <NameStyle>
      {name}
    </NameStyle>
  );
};

const NameStyle = styled.h2`
    text-align: center;
    font-size: 2rem;
    line-height: 100%;
    font-weight: 600;
    margin: 0 0 40px;
`;

export default NameProfile;
