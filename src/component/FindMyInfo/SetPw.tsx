import React, { useState } from 'react';
import { Form, Input } from 'antd';
import axios from "axios";
import DarkButton from '../Common/DarkButton'
import { isPassword } from '../../utils/CheckValid';

const SetPw = () => {
    const [loginId, setLoginId] = useState('')
    const [email, setEmail] = useState('')
    const [certNumber, setCertNumber] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [showResetPw, setShowResetPw] = useState(false)

    //인증번호 발송
    const sendCertNumber = () => {
        axios({
            method: "POST",
            url: "/api/member/certification-number",
            data: {
                loginId: loginId,
                email: email,
            },
        }).then((res) => {
            alert("인증번호를 발송했습니다.")
        })
            .catch(function (error) {
                alert("인증번호 발송에 실패했습니다");
            });
    }

    //인증번호 확인 
    const chkCertNumber = () => {
        axios({
            method: "POST",
            url: "/api/member/validation-certification-number",
            data: {
                certificationNumber: certNumber,
            },
        }).then((res) => {
            alert("인증번호가 확인되었습니다.")
            setShowResetPw(true)
        })
            .catch(function (error) {
                alert("인증번호 확인에 실패했습니다");
            });
    }

    //비밀번호 재설정
    const resetPassword = () => {

        if (!password || !rePassword) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        if (password !== rePassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }

        if (!isPassword(password)) {
            alert('필드를 형식에 맞추어 입력해 주세요.');
            return;
        }

        axios({
            method: "POST",
            url: "/api/member/resetPassword",
            data: {
                //loginId: loginId,
                password: certNumber,
            },
        }).then((res) => {
            alert("비밀번호가 재설정되었습니다.")
        })
            .catch(function (error) {
                alert("비밀번호 재설정에 실패했습니다.");
            });
    }

    return (
        <Form layout="vertical">
            {showResetPw ?
                <>
                    <Form.Item
                        name="newPassword"
                        label="새 비밀번호"
                        rules={[{ required: true, message: '새로운 비밀번호를 입력해주세요' }]}>
                        <div style={{ display: "flex" }}>
                            <Input />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="reNewPassword"
                        label="새 비밀번호 재입력"
                        rules={[{ required: true, message: '새로운 비밀번호를 입력해주세요' }]}>
                        <div style={{ display: "flex" }}>
                            <Input />
                        </div>
                    </Form.Item>
                    <DarkButton style={{ width: '100%' }} content="비밀번호 재설정" htmlType="submit" onClick={resetPassword} />
                </> :
                <>
                    <Form.Item
                        name="id"
                        label="아이디"
                        rules={[{ required: true, message: '아이디를 입력해주세요' }]}>
                        <div style={{ display: "flex" }}>
                            <Input onChange={e => setLoginId(e.target.value)} />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="이메일"
                        rules={[{ type: 'email', message: '유효하지 않은 이메일 형식입니다' }, { required: true, message: '이메일을 입력해주세요' }]}>
                        <div style={{ display: "flex" }}>
                            <Input style={{ marginRight: "5px" }} onChange={e => setEmail(e.target.value)} />
                            <DarkButton content="인증번호 발송" style={{ width: "150px" }} onClick={sendCertNumber} />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="number"
                        label="인증번호"
                        rules={[{ required: true, message: '인증번호를 입력해주세요', }]}>
                        <div style={{ display: "flex" }}>
                            <Input style={{ marginRight: "5px" }} value={certNumber} onChange={e => setCertNumber(e.target.value)} />
                        </div>
                    </Form.Item>
                    <DarkButton style={{ width: '100%' }} content="인증번호 확인" htmlType="submit" onClick={chkCertNumber} />
                </>}
        </Form>

    )
}

export default SetPw
