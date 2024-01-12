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


export { diaryContent,memberEmail };