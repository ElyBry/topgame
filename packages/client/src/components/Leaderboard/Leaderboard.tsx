import styled from 'styled-components'

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
    <LeaderboardStyle>
      <thead>
        <tr>
          <LeaderboardNumberStyle>#</LeaderboardNumberStyle>
          <th>Игрок</th>
          <th>Рейтинг</th>
        </tr>
      </thead>

      <tbody>
        {mockData.map((item, index) => (
          <tr key={index}>
            <LeaderboardNumberStyle>{index + 1}</LeaderboardNumberStyle>
            <td>{item.name}</td>
            <td>{item.rating}</td>
          </tr>
        ))}
      </tbody>
    </LeaderboardStyle>
  );
};

const LeaderboardStyle = styled.table`
    width: 100%;
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    border: 0;

    & tbody {
        border-radius: 0 0 15px 15px;
        border: 1px solid #e6e6e6;
    }
    
    & thead {
        background: #e6e6e6;
    }

    & th {
        text-align: left;
    }

    & th, & td {
        padding: 10px 0;
    }

    & th {
        font-weight: bold;
        font-size: 13px;
    }

    & td {
        background: #fff;
    }
`;

const LeaderboardNumberStyle = styled.th`
    text-align: center;
`;

export default Leaderboard;
