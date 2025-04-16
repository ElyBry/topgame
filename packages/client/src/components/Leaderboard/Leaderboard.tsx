import styles from "./Leaderboard.module.css";
import { getResults, TGetLeaderboardResponse } from '../../api/leaderboard/leaderboardApi'
import { useCallback, useEffect, useRef, useState } from 'react'

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboardList, setLeaderboardList] = useState<TGetLeaderboardResponse[] | []>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchLeaderboard = async (pageNumber: number) => {
    try {
      const response = await getResults({ ratingFieldName: 'countMoves', cursor: pageNumber, limit: 10 });
      setLeaderboardList((prev) => [...prev, ...response.data])
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetchLeaderboard(page);
    }

    if (page == 0 || !loading) {
      fetchData();
    }
  }, [page])
  const lastElementRef = useCallback((node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      })

      if (node) observer.current.observe(node);
    }, [loading, hasMore]
  )

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
        {leaderboardList.length != 0 && leaderboardList?.map((item, index) => (
          <tr key={index} ref={leaderboardList.length == index + 1 ? lastElementRef : null}>
            <td className={styles.leaderboard_number}>{index + 1}</td>
            <td className={styles.leaderboard_name}>{item.data.username}</td>
            <td className={styles.leaderboard_rating}>{item.data.countMoves * -1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
