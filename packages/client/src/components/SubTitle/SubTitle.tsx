import styled from 'styled-components'

interface SubTitleProps {
  text: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ text }) => {
  return (
    <SubtitleStyle>{text}</SubtitleStyle>
  );
};

const SubtitleStyle = styled.h2`
    color: #2b2b2b;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 15px;
    font-weight: normal;
`;

export default SubTitle;
