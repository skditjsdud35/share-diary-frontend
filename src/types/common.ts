export interface SearchDiary {
    diaryRoomId: number;
    searchDate: string;
    memberId?: number;
  };

export interface ModifyDiary {
    diaryId: number;
    content: string | null;
    feeling: string | null;
    diaryRooms: number[] | null;
    diaryStatus: boolean | null;
  };

export interface Member {
    exitDate: string;
    joinDate: string;
    memberId: number;
    nickName: string;
    role: string;
  };

export interface Noti {
    id: number,
    uuid: string,
    email: string,
    hostUserId: number,
    status: string,
    memberId: number,
    diaryRoomId: number,
    createDate: string,
    createBy: string
  };




