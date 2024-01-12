import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const loginState = atom<boolean>({
    key: 'loginState',
    default: false,
    effects_UNSTABLE: [persistAtom],
  });

const socialLoginProvider = atom<string>({
    key: 'provider',
    default: "",
  });


export { loginState, socialLoginProvider };