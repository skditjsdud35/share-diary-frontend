import { atom } from "recoil";
import { DiaryContent } from "../types/types";


const diaryContent = atom<DiaryContent[]>({
    key: 'diaryContent',
    default: [],
  });


export { diaryContent };