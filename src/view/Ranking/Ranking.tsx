import ComponentsWrapper from "../../styles/ComponentsWrapper";
import { useState } from "react";
import * as S from './RankingStyle'

const diary = [
  "클라이밍 일기방",
  "여행 일기방",
  "멍멍이 자랑 일기방",
  "집가고 싶은 사람들의 일기방",
  "클라이밍 일기방",
  "여행 일기방",
  "멍멍이 자랑 일기방",
  "집가고 싶은 사람들의 일기방",
];

function Ranking() {
  const [rankingName, setRankingName] = useState(diary[0]);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRankingName(e.target.value);
  };

  return (
    <ComponentsWrapper>
      <S.RankingWrap>
        <select onChange={handleChangeSelect} value={rankingName}>
          {diary.map((i, idx) => (
            <option value={i} key={idx}>
              {i}
            </option>
          ))}
        </select>
        <div>
          <div className="rankingName">{rankingName}</div>
          <table>
            <colgroup>
              <col width="15%" />
              <col width="30%" />
              <col />
              <col width="20%" />
            </colgroup>

            <thead>
              <tr>
                <th>순위</th>
                <th>이미지</th>
                <th>닉네임</th>
                <th>점수</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1위</td>
                <td>
                  <img
                    src="img/face-happy.png"
                    className="user-icon"
                    alt="user-icon"
                  />
                </td>
                <td>개미핡기</td>
                <td>100</td>
              </tr>

              <tr>
                <td>2위</td>
                <td>
                  <img
                    src="img/face-cool.png"
                    alt="user-icon"
                    className="user-icon"
                  />
                </td>
                <td>주말이 젤루좋아</td>
                <td>100</td>
              </tr>

              <tr>
                <td>3위</td>
                <td>
                  <img
                    src="img/face-muted.png"
                    alt="user-icon"
                    className="user-icon"
                  />
                </td>
                <td>만년 3위</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </S.RankingWrap>
    </ComponentsWrapper>
  );
}

export default Ranking;