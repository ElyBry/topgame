import styles from "./TopicPage.module.css";
import { useEffect } from 'react';
import TextareaField from "../../../components/TextareaField/TextareaField";
import PageForumWrapper from "../../../components/PageForumWrapper/PageForumWrapper";
import CommentListItem from "../../../components/CommentListItem/CommentListItem";
import { useParams } from 'react-router-dom'
import Button from "../../../components/Button/Button";

export const TopicPage = () => {
	useEffect(() => {
		const currentTitle = document.title;

		if (!currentTitle.includes("Страница с темой форума")) {
			document.title = `Страница с темой форума - ${currentTitle}`;
		}
	}, []);

	const { id } = useParams()

	const topic = {
		id: 1,
		author: 'Ivan',
		avatar: null,
		title: 'Name of the topic',
		date: '12.05.2024',
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		comments: [
			{
				id: 1,
				author: 'Jame',
				avatar: null,
				date: '10.09.2024',
				text: 'Yes, I am having the same issue:('
			},
			{
				id: 2,
				author: 'Nick',
				date: '19.09.2024',
				text: 'Hello! Was this issue ever solved for? Thank you!'
			}
		]
	 };

		const comments = topic.comments.map(comment =>
			<li
				key={comment.id}
				role="presentation"
			>
				<CommentListItem {...comment} />
			</li>
		);

		const handleSubmit = (event) => {
			event.preventDefault();

			const formData = new FormData(event.target);
			const formProps = Object.fromEntries(formData);
			console.log(formProps);
		};

  return (
		<PageForumWrapper>
			<h1 className={styles.topic_view_title}>{`Страница с темой форума № ${id}`}</h1>
			<div className={styles.topic_view_block}>
				<div className={styles.topic_view_block_top}>
					<h3 className={styles.topic_view_block_title}>{topic.title}</h3>
					<p className={styles.topic_view_block_date}>Создан: {topic.date}</p>
				</div>
				<div className={styles.topic_view_block_content}>
					<p className={styles.topic_view_block_text}>{topic.text}</p>
				</div>
				<div className={styles.topic_view_block_comments}>
					<div className={styles.topic_view_block_comments_count}>
						Всего ответов: {topic.comments.length}
					</div>
					<ul className={styles.topic_view_block_comments_list}>{comments}</ul>
				</div>
			</div>
			<form action="submit" className={[styles.topic_view_block, styles.topic_view_block_reply].join(' ')} onSubmit={handleSubmit}>
				<div className={styles.topic_view_block_content}>
					<p className={styles.topic_view_block_reply_label}>Ваш ответ</p>
					<TextareaField
						name="new_comment"
						placeholder="Добавьте комментарий"
						error={false}
					/>
					<Button
							label="Отправить"
							className={styles.topic_view_block_button}
							type="submit"
						/>
				</div>
			</form>
		</PageForumWrapper>
	);
};