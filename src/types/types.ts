export interface Diary {
    id: number;
    diaryId: number;
    feeling: string;
    content: string;
    diaryRooms?: number[];
    status: string;
    createDate?: string;
    createBy?: string;
    modifyDate?: string;
    modifyBy?: string;
    token?:string;
  };

export interface Member {
    memberId: number;
    role: string;
    nickName: string;
    exitDate: string;
    joinDate: string;
    token?:string;
  };

export interface Noti {
    id: number;
    uuid: string;
    email: string;
    hostUserId: number;
    status: string;
    memberId: number;
    diaryRoomId: number;
    diaryRoomName: string;
    createDate: string;
    createBy: string;
    inviteDate?: string;
    token?: string;
  };

export interface DiaryContent {
    date: string;
    content: string;
    feeling: string;
    diaryId: number;
    diaryRoomId: number;
    status: string;
  }

export interface Room {
    id: number;
    name: string;
    status: string;
    createBy: string;
    modifyBy: string;
}

 



