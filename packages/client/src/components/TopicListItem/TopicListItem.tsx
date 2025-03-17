import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

interface TopicListItemProps {
  author: string;
  avatar: string | null;
  title: string;
  text: string;
  commentsCount: number;
  date: string;
}

const TopicListItem: React.FC<TopicListItemProps> = ({ author, avatar, title, text, commentsCount, date }) => {

  return (
    <TopicBlockStyle>
      <TopicBlockAvatarStyle>
        {avatar && <img src={avatar} alt="avatar-image" />}
      </TopicBlockAvatarStyle>
      <TopicBlockContent>
        <p>{author}</p>
        <TopicBlockLabel>{title}</TopicBlockLabel>
        <TopicBlockText>{text}</TopicBlockText>
        <TopicBlockBottom>
          <TopicBlockCount>
            <FontAwesomeIcon icon={faComment} />
            {commentsCount}
          </TopicBlockCount>
          <span>{date}</span>
        </TopicBlockBottom>
      </TopicBlockContent>
    </TopicBlockStyle>
  );
};

const TopicBlockStyle = styled.div`
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    display: flex;
    cursor: pointer;
`;

const TopicBlockAvatarStyle = styled.div`
    min-width: 45px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--secondary-background-color);
    margin-right: 8px;
    
    & img {
        width: 100%;
        height: 100%;
    }
`;

const TopicBlockContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const TopicBlockLabel = styled.p`
    font-weight: 700;
`;

const TopicBlockText = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
`;

const TopicBlockBottom = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    color: var(--text-color-secondary)
`;

const TopicBlockCount = styled.span`
    & svg {
        margin-right: 4px;
    }
`;

export default TopicListItem;
