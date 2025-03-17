import styled from 'styled-components'

interface CommentListItemProps {
  author: string;
  avatar?: string | null;
  text: string;
  date: string;
}

const CommentListItem: React.FC<CommentListItemProps> = ({ author, avatar, text, date }) => {
  return (
    <CommentBlockStyle>
      <CommentBlockAvatarStyle>
        {avatar && <CommentBlockAvatarImgStyle src={avatar} alt="avatar-image" />}
      </CommentBlockAvatarStyle>
      <CommentBlockContentStyle>
      <CommentBlockContentTopStyle>
        <CommentBlockAuthorStyle>{author}</CommentBlockAuthorStyle>
        <CommentBlockDateStyle>{date}</CommentBlockDateStyle>
      </CommentBlockContentTopStyle>
      <p>{text}</p>
      </CommentBlockContentStyle>
    </CommentBlockStyle>
  );
};

const CommentBlockStyle = styled.div`
    padding: 20px;
    display: flex;
    position: relative;
`;

const CommentBlockAvatarStyle = styled.div`
    min-width: 45px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--secondary-background-color);
    margin-right: 16px;
`;

const CommentBlockAvatarImgStyle = styled.img`
    width: 100%;
    height: 100%;
`;

const CommentBlockContentStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 6px;
`;

const CommentBlockContentTopStyle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const CommentBlockAuthorStyle = styled.p`
    font-weight: 700;
`;

const CommentBlockDateStyle = styled.p`
    color: var(--text-color-secondary)
`;

export default CommentListItem;
