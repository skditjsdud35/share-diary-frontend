import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import axios from "axios";
import DarkButton from '../Common/DarkButton'

const FindId = () => {

    const [text, setText] = useState("");

    const onChange = (e: any) => {
        setText(e.target.value);
    };

    const clickFindBtn = () => {
        axios({
            method: "GET",
            url: process.env.REACT_APP_BACKEND_URL + "/api/member/me/id",
            params: {
                email: text,
            },
        }).then((res) => {
            alert(`회원님의 아이디는 ${res.data.loginId} 입니다`)
        })
            .catch(function (error) {
                alert("회원을 찾을 수 없습니다.");
            });
    }

    return (
        <Form name="form_item_path" layout="vertical">
            <Form.Item
                name="email"
                label="이메일"
                rules={[
                    {
                        type: 'email',
                        message: '유효하지 않은 이메일 형식입니다',
                    },
                    {
                        required: true,
                        message: '이메일을 입력해주세요',
                    },
                ]}
            >
                <div style={{ display: "flex" }}>
                    <Input onChange={onChange} />
                </div>
            </Form.Item>
            <DarkButton style={{ width: '100%' }} content="아이디 찾기" htmlType="submit" onClick={clickFindBtn} />
        </Form>
    )
}

export default FindId