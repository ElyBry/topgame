import styled from 'styled-components'

type CurrentDataProfileProps = {
  label: string;
  data: string;
};

const CurrentDataProfile: React.FC<CurrentDataProfileProps> = ({ label, data }) => {
  return (
    <CurrentStyle>
      <CurrentLabelStyle>{label} </CurrentLabelStyle>
      <CurrentDataStyle>{data}</CurrentDataStyle>
    </CurrentStyle>
  );
};

const CurrentStyle = styled.div`
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--layout-border);
    margin: 16px 0 0;
    font-size: 1.3rem;
`;

const CurrentLabelStyle = styled.div`
    color: var(--text-color);
    margin-left: 16px;
`;

const CurrentDataStyle = styled.div`
    color: var(--text-secondary-color);
    margin-right: 16px;
`;

export default CurrentDataProfile;
