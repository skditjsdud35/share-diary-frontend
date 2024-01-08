import axios from 'axios';
import * as t from '../types/common'
let accessToken = localStorage.getItem('login-token');

//날짜별 일기 조회 API
export const getDiary = (Diary: t.SearchDiary) => {
    console.log(accessToken)
    axios.get('/api/v0/daily-diaries', {
        headers: { Authorization: accessToken },
        params: {
            diaryRoomId: Diary.diaryRoomId,
            searchDate: Diary.searchDate,
            memberId: Diary.memberId
        }
    }).then(res => res.data);

}


//날짜별 일기 수정 API
export const patchDiary = (Diary: t.ModifyDiary) =>
    axios.patch(`/api/v0/daily-diaries/${Diary.diaryId}`, {
        content: Diary.content,
        feeling: Diary.feeling,
        diaryRooms: Diary.diaryRooms,
        status: Diary.diaryStatus ? "HIDE" : "SHOW"
    }, {
        headers: { Authorization: accessToken }
    }).then(res => res.data);


//일기방 멤버 조회 API
export const getMember = (Member: t.SearchDiary) =>
    axios.get(`/api/v0/diary-rooms/${Member.diaryRoomId}/members`, {
        headers: { Authorization: accessToken },
        params: {
            searchDate: Member.searchDate,
        }
    }).then(res => res.data.memberInfos);


//일기방 이모지 조회 API
export const getEmoji = (diaryId: number) =>
    axios.get(`/api/emoji/${diaryId}`, {
        headers: { Authorization: accessToken },
    }).then(res => res.data);


//일기방 이모지 저장 API
export const postEmoji = ({ diaryId, emoji }: { diaryId: number, emoji: string }) =>
    axios.post(`/api/emoji/${diaryId}`, {
        emoji: emoji
    }, {
        headers: { Authorization: accessToken },
    }).then(res => res.data);


//마이페이지 알림 내역 조회 API
export const getNotiList = () =>
    axios.get('/api/v0/member-invite-histories', {
        headers: { Authorization: accessToken },
    }).then(res => res.data);


//uuid 체크 API
export const checkUuid = (uuid: string) =>
    axios.get(`/api/member/uuid/${uuid}`).then(res => res.data);


//export const fetchData1 = () => axios.get('https://api.github.com/repos/tannerlinsley/react-query');

//export const postTodo = (todo: any) => axios.post('/api/todo', { todo }).then(res => res.data);

//export const getProjects = (page: number) => axios.get(`/api/projects?page=${page}`).then(res => res.data);