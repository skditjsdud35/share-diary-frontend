// import { useRecoilValue } from "recoil";
// import { selectDateState } from "../../atom/recoil";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
// import { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import { getDiary, getMember, patchDiary } from '../../api/Fetcher'
// import { ModifyDiary, Member } from '../../types/common'
// import { useQuery, useMutation } from 'react-query';


// function SelectedDiary() {
//   const accessToken = localStorage.getItem('login-token');
//   const { diaryRoom } = useParams();
//   const selectDate = useRecoilValue(selectDateState);

//   const { data: diaryData, error: diaryError } = useQuery(
//     ['diaryData'], () => getDiary({
//       diaryRoomId: Number(diaryRoom),
//       searchDate: selectDate,
//       memberId: 1,
//       token: String(accessToken)
//     }));

//   const { data: memberData, error: memberError } = useQuery(
//     ['memberData'], () => getMember({
//       diaryRoomId: Number(diaryRoom),
//       searchDate: selectDate,
//       token: String(accessToken)
//     }));

//   const [isPrivate, setIsPrivate] = useState(false);

//   const { mutate } = useMutation((diary: ModifyDiary) => patchDiary(diary), {
//     onSuccess: () => { 	// mutate가 정상적으로 실행되면, 함수를 실행합니다.
//       console.log("createPost success");
//     },
//     onError: () => { 	// mutate가 실패하면, 함수를 실행합니다.
//       console.log("createPost error");
//     }
//   });


// const [emojiCount, setEmojiCount] = useState({
//   heart: 0,
//   thumb: 0,
//   party: 0,
//   cake: 0,
//   devil: 0,
// });

// return (
//   <Wrap>
//     <div className="left">
//       <div className="top">
//         <span className="date">{selectDate} 오늘의 일기</span>
//         <span>
//           <span className="emoji">
//             <span>
//               ❤️<span className="num">0</span>
//             </span>
//             <span>
//               👍<span className="num">0</span>
//             </span>
//             <span>
//               🎉<span className="num">0</span>
//             </span>
//             <span>
//               🎂<span className="num">0</span>
//             </span>
//             <span>
//               😈<span className="num">0</span>
//             </span>
//           </span>
//           <span
//             className="isPrivate"
//             onClick={toggleDiaryStatus}
//           >
//             <FontAwesomeIcon icon={diaryData?.diaryStatus ? faLock : faLockOpen} />
//           </span>
//         </span>
//       </div>
//       <div className="diaryTime">[작성시각] {(diaryData?.createDate)?.split("T")[1].split(".")[0]}</div>
//       <button>수정하기</button>
//       <div className="diary">{diaryData?.content}</div>
//     </div>
//     <div className="right">
//       {memberData?.map((member: Member, i: number) => (
//         <div key={i}>
//           {member.nickName}
//         </div>
//       ))}
//     </div>
//   </Wrap>
// );
// }

// export default SelectedDiary;

// const Wrap = styled.div`
//   width: 70%;
//   margin: 0 auto 5rem;
//   display: flex;
//   justify-content: space-evenly;

//   .left {
//     // margin-left: 4rem;
//     margin-top: 2rem;
//     width: 70%;
//   }

//   .top {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-end;
//   }

//   .date {
//     font-size: 23px;
//     font-weight: bold;
//   }

//   .emoji,
//   .isPrivate {
//     padding-left: 18px;
//   }

//   .emoji {
//     font-size: 15px;
//     span {
//       cursor: pointer;
//       background: #dfdfdf;
//       padding: 0.5rem;
//       padding-bottom: 0;
//       font-size: 20px;
//       margin-left: 1rem;
//       border-radius: 5px;

//       &:first-child {
//         margin-left: 0;
//       }

//       .num {
//         border: none;
//         font-size: 12px;
//         padding: 0;
//         margin-left: 0;
//       }
//     }
//   }

//   .isPrivate {
//     width: 20px;
//     display: inline-block;

//     path {
//       cursor: pointer;
//       color: #8685ef;
//     }
//   }

//   .diary {
//     margin-top: 2rem;
//     margin-bottom: 2rem;
//     border: 2px solid #d6d4e6;
//     border-radius: 10px;
//     padding: 1rem;
//     min-height: 300px;
//   }

//   .diaryTime {
//     margin-top: 2rem;
//   }

//   .right {
//     width: 20%;
//     margin-top: 2rem;
//     border: 2px solid #d6d4e6;
//     border-radius: 10px;
//     min-height: 100px;
//     padding: 1rem;

//     div {
//       margin-bottom: 10px;
//       padding: 5px;
//       cursor: pointer;

//       :first-child {
//         background: #d6d4e6;
//       }
//     }
//   }

//   @media (max-width: 1520px) {
//     .emoji {
//       span {
//         font-size: 16px;
//       }
//     }

//     .num {
//       display: none;
//     }
//   }

//   @media (max-width: 1330px) {
//     .top {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .date {
//       margin-bottom: 1.5rem;
//     }

//     .emoji {
//       padding-left: 0;
//     }
//   }
// `;
