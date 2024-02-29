import axiosInstance from '../utils/TokenRefresher';
import * as t from '../types/types'


//날짜별 일기 조회 API
export const getDiary = async ({ diaryRoomId, searchDate, memberId, token }: { diaryRoomId: number, searchDate: string, memberId: number, token: string }) => {
    const res = await axiosInstance.get(process.env.REACT_APP_BACKEND_URL + '/api/v0/daily-diaries', {
        headers: {
            Authorization: token,
        },
        params: {
            diaryRoomId: diaryRoomId,
            searchDate: searchDate,
            memberId: memberId
        }
    });
    return res.data;
}

//날짜별 일기 수정 API
export const patchDiary = async (Diary: t.Diary) => {
    const res = await axiosInstance.patch(process.env.REACT_APP_BACKEND_URL + `/api/v0/daily-diaries/${Diary.diaryId}`, {
        content: Diary.content,
        feeling: Diary.feeling,
        diaryRooms: Diary.diaryRooms,
        status: Diary.status ? "HIDE" : "SHOW"
    }, {
        headers: { Authorization: Diary.token }
    });
    return res.data;
}

//내가 속한 일기방 조회 API
export const getDiaryRooms = async ({ token }: { token: string }) => {
    const res = await axiosInstance.get(process.env.REACT_APP_BACKEND_URL + '/api/v0/diary-rooms', {
        headers: { Authorization: token },
        params: {
            limit: 10,
        }
    });
    return res.data;
}

//일기방 멤버 조회 API
export const getMember = async ({ diaryRoomId, searchDate, token }: { diaryRoomId: number, searchDate: string, token: string }) => {
    const res = await axiosInstance.get(process.env.REACT_APP_BACKEND_URL + `/api/v0/diary-rooms/${diaryRoomId}/members`, {
        headers: { Authorization: token },
        params: {
            searchDate: searchDate,
        }
    });
    return res.data.memberInfos;
}

//일기방 이모지 조회 API
export const getEmoji = async ({ diaryId, token }: { diaryId: number, token: string }) => {
    const res = await axiosInstance.get(process.env.REACT_APP_BACKEND_URL + `/api/emoji/${diaryId}`, {
        headers: { Authorization: token },
    });
    return res.data;
}

//일기방 이모지 저장 API
export const postEmoji = async ({ diaryId, emoji, token }: { diaryId: number, emoji: string, token: string }) => {
    const res = await axiosInstance.post(process.env.REACT_APP_BACKEND_URL + `/api/emoji/${diaryId}`, {
        emoji: emoji
    }, {
        headers: { Authorization: token },
    });
    return res.data;
}

//알림내역 조회 API
export const getNotiList = async (token: string) => {
    const res = await axiosInstance.get(process.env.REACT_APP_BACKEND_URL + '/api/v0/member-invite-histories', {
        headers: { Authorization: token },
        params: {
            limit: 10,
        }
    });
    return res.data;
}

//알림내역 수락&거절 API
export const patchNotiList = async ({ historyId, status, token }: { historyId: number, status: string, token: string }) => {
    const res = await axiosInstance.patch(process.env.REACT_APP_BACKEND_URL + `/api/v0/member-invite-histories/${historyId}`, {
        status: status,
    }, {
        headers: { Authorization: token },
    });
    return res.data;
}

//uuid 체크 API
export const checkUuid = async (uuid: string) => {
    const res = await axiosInstance.get(process.env.REACT_APP_BACKEND_URL + `/api/member/uuid/${uuid}`);
    return res.data;
}

//export const fetchData1 = () => axios.get('https://api.github.com/repos/tannerlinsley/react-query');

//export const postTodo = (todo: any) => axios.post('/api/todo', { todo }).then(res => res.data);

//export const getProjects = (page: number) => axios.get(`/api/projects?page=${page}`).then(res => res.data);