import styles from "./ForumPage.module.css";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopicListItem from "../../../components/TopicListItem/TopicListItem";
import Button from "../../../components/Button/Button";
import PageForumWrapper from "../../../components/PageForumWrapper/PageForumWrapper";

export const ForumPage = () => {
	useEffect(() => {
		const currentTitle = document.title;

		if (!currentTitle.includes("Форум")) {
			document.title = `Форум - ${currentTitle}`;
		}
	}, []);


	const navigate = useNavigate();

	const handleNavigateNew = () => {
		navigate('/forum/new');
	};

	const handleNavigateView = (id: number) => {
		navigate(`/forum/${id}`);
	};

	const topics = [
		{ id: 1, author: 'Ivan', avatar: null, title: 'Name of the topic', commentsCount: 5, date: '12.05.2024', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
		{ id: 2, author: 'Alex', avatar: null, title: 'Name of the topic', commentsCount: 5, date: '12.05.2024', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
		{ id: 3, author: 'Eva', avatar: null, title: 'Name of the topic', commentsCount: 5, date: '12.05.2024', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
	];

	const topicItems = topics.map(topic =>
    <li
      key={topic.id}
			onClick={() => handleNavigateView(topic.id)}
			role="presentation"
    >
      <TopicListItem {...topic} />
    </li>
  );

	return (
		<PageForumWrapper>
			<div className={styles.forum_top}>
				<h1 className={styles.forum_title}>Форум</h1>
					<Button
						label="Создать топик"
						type="button"
						className={styles.forum_button}
						onClick={handleNavigateNew}
					/>
			</div>
			<ul className={styles.forum_list}>{topicItems}</ul>
		</PageForumWrapper>
	)
}
