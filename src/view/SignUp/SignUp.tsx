import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import type { FormItemProps } from 'antd';
import axios from 'axios';
import DarkButton from '../../component/Common/DarkButton';
import BasicCard from '../../component/Common/BasicCard';
import * as S from './SignUpStyle'
import { isId, isEmail, isPassword, isNickname } from '../../utils/CheckValid';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
    children: React.ReactNode;
}

//styled-components와 antd의 폼 컴포넌트를 활용하여 중첩된 폼 필드 그룹을 생성하기 위한 함수들
function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
};

const SignUp = ({ userEmail }: { userEmail?: string | null | "" }) => {
    let navigate = useNavigate();
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [isDuplication, setIsDuplication] = useState([false, false]);
    const [isDuplicationLoading, setIsDuplicationLoading] = useState([false, false]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [id, setId] = useState('');
    const [email, setEmail] = useState(userEmail ? userEmail : '');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [nickName, setNickName] = useState('');

    //회원가입 req
    const handleSignUp = () => {

        if (!id || !password || !rePassword || !nickName || (userEmail && !email)) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        if (password !== rePassword) {
            alert('비밀번호를 정확히 입력해 주세요.');
            return;
        }

        if (!isId(id) || (userEmail && !isEmail(email)) || !isPassword(password) || !isNickname(nickName)) {
            alert('필드를 형식에 맞추어 입력해 주세요.');
            return;
        }

        if ((userEmail && !isDuplication[0]) || (!userEmail && (!isDuplication[0] || !isDuplication[1]))) {
            alert('중복체크를 완료해 주세요.');
            return;
        }


        axios({
            method: "post",
            url: "/api/member/signUp",
            data: {
                loginId: id,
                email: email,
                password: password,
                nickName: nickName,
            },
        }).then((res) => {
            setIsSubmitted(true);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    };

    //아이디 중복 체크
    const chkDupId = () => {
        if (!isId(id)) {
            alert('필드를 형식에 맞추어 입력해 주세요.'); return;
        }
        isDuplicationLoading[0] = true
        setIsDuplicationLoading([...isDuplicationLoading])
        axios({
            method: "post",
            url: "/api/member/loginId/validation",
            data: {
                loginId: id
            },
        }).then((res) => {
            isDuplicationLoading[0] = false
            setIsDuplicationLoading([...isDuplicationLoading])
            if (res.data.data) {
                alert("이미 존재하는 아이디입니다.")
            } else {
                isDuplication[0] = true
                setIsDuplication([...isDuplication])
                alert("사용 가능한 아이디입니다.")
            }
        }).catch(function (error) {
            console.log(error.toJSON());
        });
    };

    //이메일 인증
    const chkDupEmail = () => {
        if (!isEmail(email)) {
            alert('필드를 형식에 맞추어 입력해 주세요.'); return;
        }
        isDuplicationLoading[1] = true
        setIsDuplicationLoading([...isDuplicationLoading])
        axios({
            method: "post",
            url: "/api/member/email/validation",
            data: {
                email: email
            },
        }).then((res) => {
            isDuplicationLoading[1] = false
            setIsDuplicationLoading([...isDuplicationLoading])
            if (res.data.data) {
                alert("이미 존재하는 이메일입니다.")
            } else {
                isDuplication[1] = true
                setIsDuplication([...isDuplication])
                alert("사용 가능한 이메일입니다.")
            }
        }).catch(function (error) {
            console.log(error.toJSON());
        });

    };

    return (
        <S.StyledBackgroud>
            <BasicCard>
                <S.Title>회원가입</S.Title>
                {isSubmitted ? (
                    <>
                        <S.SuccessMessage>회원가입이 완료되었습니다.</S.SuccessMessage>
                        <DarkButton content='로그인 화면으로' style={{ width: '100%' }} onClick={() => navigate('/userLogin')} />
                    </>
                ) : (
                    <Form name="form_item_path" layout="vertical">
                        <MyFormItemGroup prefix={['user']}>
                            <MyFormItem name="id" label="아이디" rules={[
                                {
                                    validator: (_, value) =>
                                        isId(value) ? Promise.resolve() : Promise.reject('영문으로 시작하는 영문 또는 숫자 6~20자를 입력해 주세요.'),
                                },]}>
                                <S.FormItemWraper>
                                    <Input style={{ marginRight: '8px' }} onChange={e => setId(e.target.value)} disabled={isDuplication[0]} />
                                    <DarkButton content='중복 체크' loading={isDuplicationLoading[0]} onClick={chkDupId} disabled={isDuplication[0]} />
                                </S.FormItemWraper>
                            </MyFormItem>

                            {
                                userEmail ? <MyFormItem name="email" label="이메일">
                                    <S.FormItemWraper>
                                        <Input style={{ marginRight: '8px' }} value={userEmail || ''} disabled />
                                        <DarkButton content='중복 체크' loading={false} disabled />
                                    </S.FormItemWraper>
                                </MyFormItem> : <MyFormItem name="email" label="이메일" rules={[
                                    {
                                        validator: (_, value) =>
                                            isEmail(value) ? Promise.resolve() : Promise.reject('이메일 형식이 아닙니다.'),
                                    },]}>
                                    <S.FormItemWraper>
                                        <Input style={{ marginRight: '8px' }} onChange={e => setEmail(e.target.value)} disabled={isDuplication[1]} />
                                        <DarkButton content='중복 체크' loading={isDuplicationLoading[1]} onClick={chkDupEmail} disabled={isDuplication[1]} />
                                    </S.FormItemWraper>
                                </MyFormItem>
                            }
                            <MyFormItem name="password" label="비밀번호" rules={[
                                {
                                    validator: (_, value) =>
                                        isPassword(value) ? Promise.resolve() : Promise.reject('영문, 숫자, 특수문자 조합의 8 ~ 16자를 입력해 주세요.'),
                                },]}>
                                <Input.Password onChange={e => setPassword(e.target.value)} />
                            </MyFormItem>
                            <MyFormItem name="rePassword" label="비밀번호 재입력" rules={[
                                {
                                    validator: (_, value) =>
                                        value && value === password ? Promise.resolve() : Promise.reject('비밀번호를 정확히 입력해 주세요.'),
                                },
                            ]}>
                                <Input.Password onChange={e => setRePassword(e.target.value)} />
                            </MyFormItem>
                            <MyFormItem name="nickname" label="닉네임" rules={[
                                {
                                    validator: (_, value) =>
                                        isNickname(value) ? Promise.resolve() : Promise.reject('최대 20자의 닉네임을 입력해 주세요.'),
                                },]}>
                                <Input onChange={e => setNickName(e.target.value)} />
                            </MyFormItem>
                        </MyFormItemGroup>
                        <DarkButton style={{ width: '100%' }} content='가입하기' htmlType="submit" onClick={handleSignUp} />
                    </Form>)}
            </BasicCard>
        </S.StyledBackgroud>

    );
}

export default SignUp;