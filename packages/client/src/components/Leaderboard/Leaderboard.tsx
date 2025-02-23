import styles from "./Leaderboard.module.css";

const Leaderboard: React.FC = () => {
  const mockData = [
    {
      "name": "Игрок1",
      "rating": "100"
    },
    {
      "name": "Игрок2",
      "rating": "50"
    },
    {
      "name": "Игрок3",
      "rating": "35"
    }
  ]

  return (
    <table className={styles.leaderboard}>
      <thead>
        <tr>
          <th className={styles.leaderboard_number}>#</th>
          <th className={styles.leaderboard_name}>Игрок</th>
          <th className={styles.leaderboard_rating}>Рейтинг</th>
        </tr>
      </thead>

      <tbody>
        {mockData.map((item, index) => (
          <tr key={index}>
            <td className={styles.leaderboard_number}>{index + 1}</td>
            <td className={styles.leaderboard_name}>{item.name}</td>
            <td className={styles.leaderboard_rating}>{item.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
