// 아이디 체크 (영문자로 시작하는 영문자 또는 숫자 6~20자)
export const isId = (asValue: string) => {
    var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

// 이메일 체크
export const isEmail = (asValue: string) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
}

// 비밀번호 체크 (8 ~ 16자 영문, 숫자, 특수문자 조합)
export const isPassword = (asValue: string) => {
    var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

// 닉네임 체크 (최대 20자)
export const isNickname = (asValue: string) => {
    var regExp = /^.{1,20}$/;
    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}