import { useRecoilValue, useRecoilState } from "recoil";
import { selectDateState } from "../../atom/recoil";
import { diaryContent } from "../../atom/diary";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getDiary, getMember, getEmoji, postEmoji } from '../../api/Fetcher'
import { Diary, Member, } from '../../types/types'
import { useQuery, useMutation, useQueries } from 'react-query';
import { useNavigate } from "react-router-dom";


function SelectedDiary() {
  const accessToken = localStorage.getItem('login-token');
  const [clickEmoji, setClickEmoji] = useState([false, false, false, false, false]);
  const [clickLock, setClickLock] = useState(false);
  const [diary, setDiary] = useRecoilState(diaryContent)
  const { diaryRoom } = useParams();
  const selectDate = useRecoilValue(selectDateState);
  const navigate = useNavigate();
  const emojiList = [
    { emoji: "❤️", name: "heart" },
    { emoji: "👍", name: "thumb" },
    { emoji: "🎉", name: "party" },
    { emoji: "🎂", name: "cake" },
    { emoji: "😈", name: "devil" },
  ];


  //시간 포맷
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const periodOfDay = hours < 12 ? '오전' : '오후';

    return `${periodOfDay} ${formattedHours}:${formattedMinutes}`;
  }


  // 클릭한 이모지 배열로 가져오기
  const getTrueEmojis = (): string[] => {
    return clickEmoji
      .map((value, index) => value ? emojiList[index].name : null)
      .filter(name => name !== null) as string[];
  }

  //멤버 조회
  const { data: memberData, isError: memberError } = useQuery(
    ['memberData', selectDate], () => getMember({
      diaryRoomId: Number(diaryRoom),
      searchDate: selectDate,
      token: String(accessToken)
    }));

  const memberId = memberData?.[0]?.memberId

  //일기 조회
  const { data: diaryData, isError: diaryError } = useQuery(
    ['diaryData', memberId], () => getDiary({
      diaryRoomId: Number(diaryRoom),
      searchDate: selectDate,
      memberId: memberId,
      token: String(accessToken)
    }),
    {
      enabled: !!memberData,
    });

  const diaryId = diaryData?.id

  //이모지 조회
  const { data: emojiData, isError: emojiError } = useQuery(
    ['emojiData', diaryId], () => getEmoji({
      diaryId: diaryId,
      token: String(accessToken)
    }),
    {
      enabled: !!diaryId,
    });

  //이모지 수정
  const { mutate: emojiMutate } = useMutation({
    mutationFn: () => postEmoji({
      diaryId: diaryId,
      emoji: getTrueEmojis(),
      token: String(accessToken)
    })
  });

  useEffect(() => {
    if (diaryData) {
      setClickLock(diaryData?.status);
    }

    return () => {
      console.log('컴포넌트가 화면에서 사라짐')
      emojiMutate();
    }
  }, [diaryData]);


  //이모지 선택
  const setData = (i: number) => {
    let Emoji = [...clickEmoji]
    Emoji[i] = !Emoji[i]
    setClickEmoji(Emoji)
  }

  if (memberError || diaryError || emojiError) {
    return <h2>오늘의 일기가 없습니다</h2>;
  }


  //일기 수정
  const modifyDiary = () => {
    setDiary([selectDate, diaryData?.content, diaryData?.feeling, diaryId, Number(diaryRoom), diaryData?.status])
    navigate("/write", { state: { modify: true } });
  }

  return (
    <Wrap>
      {memberError || diaryError || emojiError ? <h2>오늘의 일기가 없습니다</h2> :
        <div className="left">
          <div className="top">
            <span className="date">{selectDate} 오늘의 일기</span>
            <span>
              <span className="emoji">
                {emojiList.map((item, i) => (
                  <span onClick={() => setData(i)}>
                    {item.emoji}
                    {clickEmoji[i] === false ? <span>{emojiData?.[item.name]}</span> : <span>{emojiData?.[item.name] + 1}</span>}
                  </span>
                ))}
              </span>
              <span
                className="isPrivate"
              >
                <FontAwesomeIcon onClick={() => setClickLock(!clickLock)} icon={clickLock ? faLock : faLockOpen} />
              </span>
            </span>
          </div>
          <div className="diaryTime">[작성시각] {formatTime(diaryData?.createDate)}</div>
          <button onClick={modifyDiary}>수정하기</button>
          <div className="diary">{diaryData?.content}</div>
        </div>}

      <div className="right">
        {memberData?.map((member: Member, i: number) => (
          <div key={i}>
            {member.nickName}
          </div>
        ))}
      </div>
    </Wrap >
  );
}

export default SelectedDiary;

const Wrap = styled.div`
  width: 70%;
  margin: 0 auto 5rem;
  display: flex;
  justify-content: space-evenly;

  .left {
    // margin-left: 4rem;
    margin-top: 2rem;
    width: 70%;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .date {
    font-size: 23px;
    font-weight: bold;
  }

  .emoji,
  .isPrivate {
    padding-left: 18px;
  }

  .emoji {
    font-size: 15px;
    span {
      cursor: pointer;
      background: #dfdfdf;
      padding: 0.5rem;
      padding-bottom: 0;
      font-size: 20px;
      margin-left: 1rem;
      border-radius: 5px;

      &:first-child {
        margin-left: 0;
      }

      .num {
        border: none;
        font-size: 12px;
        padding: 0;
        margin-left: 0;
      }
    }
  }

  .isPrivate {
    width: 20px;
    display: inline-block;

    path {
      cursor: pointer;
      color: #8685ef;
    }
  }

  .diary {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 2px solid #d6d4e6;
    border-radius: 10px;
    padding: 1rem;
    min-height: 300px;
  }

  .diaryTime {
    margin-top: 2rem;
  }

  .right {
    width: 20%;
    margin-top: 2rem;
    border: 2px solid #d6d4e6;
    border-radius: 10px;
    min-height: 100px;
    padding: 1rem;

    div {
      margin-bottom: 10px;
      padding: 5px;
      cursor: pointer;

      :first-child {
        background: #d6d4e6;
      }
    }
  }

  @media (max-width: 1520px) {
    .emoji {
      span {
        font-size: 16px;
      }
    }

    .num {
      display: none;
    }
  }

  @media (max-width: 1330px) {
    .top {
      flex-direction: column;
      align-items: flex-start;
    }

    .date {
      margin-bottom: 1.5rem;
    }

    .emoji {
      padding-left: 0;
    }
  }
`;
