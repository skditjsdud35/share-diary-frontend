import { atom } from "recoil";

export const selectDateState = atom<string>({
  key: "selectDateState",
  default: "",
});

export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
});

export const diaryUpdateState = atom<boolean>({
  key: "diaryUpdateState",
  default: false,
});

interface IDiaryList {
  id: number;
  name: string;
  createBy: string;
  modifyBy: string;
}

export const diaryListState = atom<IDiaryList[]>({
  key: "diaryListState",
  default: [],
});
