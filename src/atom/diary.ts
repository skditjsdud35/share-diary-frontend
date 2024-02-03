import { atom } from "recoil";
import { DiaryContent } from "../types/types";


const diaryContent = atom<DiaryContent[]>({
    key: 'diaryContent',
    default: [],
  });

const memberEmail = atom<string>({
    key: 'memberEmail',
    default: '',
  });

const delegateRoomId = atom<number>({
    key: 'delegateDiaryId',
    default: 0,
  });

  const delegateModalShow = atom<boolean>({
    key: 'delegateModalShow',
    default: false,
  });


const loginId = atom<string>({
    key: 'loginId',
    default: '',
  });




export { diaryContent,memberEmail,delegateRoomId, delegateModalShow, loginId  };