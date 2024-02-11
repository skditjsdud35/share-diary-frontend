import { atom } from "recoil";
import { DiaryContent } from "../types/types";


const diaryContent = atom<DiaryContent[]>({
    key: 'diaryContent',
    default: [],
  });

const selectedDiaryId = atom<number>({
    key: 'selectedDiaryId',
    default: 0,
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

  const isDelegate = atom<boolean>({
    key: 'isDelegate',
    default: false,
  });

  const diaryRoomHostId = atom<number>({
    key: 'diaryRoomHostId',
    default: 0,
  });

  const loginId = atom<number>({
    key: 'loginId',
    default: 0,
  });

  const loginNickname = atom<string>({
    key: 'loginNickname',
    default: '',
  });




export { diaryContent,memberEmail,delegateRoomId, delegateModalShow, isDelegate, loginId, diaryRoomHostId, selectedDiaryId,loginNickname  };