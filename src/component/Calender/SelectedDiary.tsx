import { useRecoilValue, useRecoilState } from "recoil";
import { selectDateState } from "../../atom/recoil";
import { diaryContent, loginId, diaryRoomHostId, selectedDiaryId } from "../../atom/diary";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getDiary, getMember, getEmoji, postEmoji } from '../../api/Fetcher'
import { Diary, Member } from '../../types/types'
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import BasicButton from "../Common/BasicButton";
import LoadDataSection from "../Common/LoadDataSection";
import NoDataSection from "../Common/NoDataSection";


function SelectedDiary() {
  const accessToken = localStorage.getItem('login-token');
  const [clickEmoji, setClickEmoji] = useState([false, false, false, false, false]);
  const [diary, setDiary] = useRecoilState(diaryContent)
  const [userId, setUserId] = useRecoilState(loginId)
  const [hostId, setHostId] = useRecoilState(diaryRoomHostId)
  const [diaryId, setDiaryId] = useRecoilState(selectedDiaryId)
  const { diaryRoom } = useParams();
  const selectDate = useRecoilValue(selectDateState);
  const [clickedMemberId, setClickedMemberId] = useState<number>(userId);
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

  //멤버 조회
  const { data: memberData, isError: memberError, isLoading: memberLoading } = useQuery(
    ['memberData', selectDate, diaryId], () => getMember({
      diaryRoomId: Number(diaryRoom),
      searchDate: selectDate,
      token: String(accessToken)
    }));

  // 일기 조회
  const { data: diaryData, isError: diaryError, isLoading: diaryLoading } = useQuery(
    ['diaryData', diaryId, clickedMemberId], () => getDiary({
      diaryRoomId: Number(diaryRoom),
      searchDate: selectDate,
      memberId: clickedMemberId,
      token: String(accessToken)
    }));

  const diaryDataId = diaryData?.id
  const hostData = memberData?.find((member: Member) => member.role === 'HOST');
  setHostId(hostData?.memberId)

  useEffect(() => {
    return () => {
      setHostId(0)
    };
  }, []);

  //이모지 조회
  const { data: emojiData, isError: emojiError, refetch } = useQuery(
    ['emojiData', diaryDataId, diaryId, clickedMemberId], () => getEmoji({
      diaryId: diaryDataId,
      token: String(accessToken)
    }),
    {
      enabled: !!diaryDataId,
    });

  //이모지 수정
  const { mutate: emojiMutate } = useMutation({
    mutationFn: (emojiName: string) => postEmoji({
      diaryId: diaryDataId,
      emoji: emojiName.toUpperCase(),
      token: String(accessToken)
    }),
    onSuccess: () => {
      refetch();
    }
  });

  //일기 수정
  const modifyDiary = () => {
    setDiary([selectDate, diaryData?.content, diaryData?.feeling, diaryDataId, Number(diaryRoom), diaryData?.status])
    navigate("/write", { state: { modify: true } });
  }

  if (memberError || diaryError || emojiError) {
    return <NoDataSection content="오늘의 일기가 없습니다" fontSize="24px" />;
  }

  if (memberLoading || diaryLoading) {
    return <LoadDataSection />;
  }

  return (
    <Wrap>
      {memberError || diaryError ? <h2>오늘의 일기가 없습니다</h2> :
        <div className="left">
          <div className="top">
            <span className="date">{selectDate} 오늘의 일기</span>
            <span style={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
              <span className="emoji">
                {emojiList.map((item, i) => (
                  <span onClick={() => emojiMutate(emojiList[i].name)}>
                    {item.emoji}
                    &nbsp;
                    {emojiData?.[item.name]}
                  </span>
                ))}
              </span>
              <span className="diaryTime"> {formatTime(diaryData?.createDate)}</span>
              <FontAwesomeIcon style={{ color: "#8685ef" }} icon={diaryData?.status === "SHOW" ? faLockOpen : faLock} />
              <BasicButton onClick={modifyDiary} content="수정하기" style={{ width: '100px' }} />
            </span>
          </div>
          <div className="diary">{diaryData?.content}</div>
        </div>}

      <div className="right">
        {memberData?.map((member: Member, i: number) => (
          <div key={i}
            onClick={() => setClickedMemberId(member.memberId)}
            style={{
              backgroundColor: clickedMemberId === member.memberId ? '#dfdfdf' : '',
              borderRadius: clickedMemberId === member.memberId ? '20px' : ''
            }}>
            {member.nickName} {member.role === 'HOST' ? '👑' : ''}
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


  .emoji {
    font-size: 15px;
    margin-top: 5px;
    span {
      cursor: pointer;
      border: 1px solid #dfdfdf;
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

  .diary {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    min-height: 300px;
    border: 1px solid #dfdfdf;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #dfdfdf;
  }

  .right {
    width: 20%;
    margin-top: 2rem;
    min-height: 100px;
    padding: 1rem;
    border: 1px solid #dfdfdf;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #dfdfdf;

    div {
      margin-bottom: 10px;
      padding: 5px;
      cursor: pointer;
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
