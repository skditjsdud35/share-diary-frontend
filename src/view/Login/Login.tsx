import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import { CloseOutlined, CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginId } from '../../atom/diary';
import { useRecoilState } from 'recoil';
import { loginState } from '../../atom/loginState';
import SocialLogin from '../../component/Login/SocialLogin';
import DarkButton from '../../component/Common/DarkButton';
import BasicCard from '../../component/Common/BasicCard';
import * as S from "./LoginStyle"

function Login() {
  let navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userId, setUserId] = useRecoilState(loginId);

  //로그인 유지 버튼 클릭
  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  //로그인 req
  const handleLogin = () => {
    axios({
      method: "POST",
      url: process.env.REACT_APP_BACKEND_URL + "/api/auth/login",
      data: {
        loginId: id,
        password: password,
      },
    }).then((res) => {
      localStorage.setItem('login-token', res.data.accessToken);
      setUserId(res.data.memberId)
      setIsLoggedIn(true);
      navigate("/");
    }).catch(function (error) {
      alert(error.response.data.message);
    });
  };

  return (
    <S.StyledBackgroud>
      <BasicCard>
        <S.Title>로그인</S.Title>
        <div style={{ marginBottom: "10px" }}>잇츠 다이어리에서 친구와 일기를 공유하세요 :)</div>
        <S.StyledForm>
          <S.StyledFormItem name="email" rules={[{ required: true, message: '아이디를 입력해주세요', },]}>
            <Input placeholder="아이디" onChange={e => setId(e.target.value)} />
          </S.StyledFormItem>

          <S.StyledFormItem name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요', },]}>
            <Input.Password placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
          </S.StyledFormItem>

          {/* <S.StyledTextContain color="#ababab" justifyContent="start" marginBottom="10px" onClick={handleClick}>
            {isChecked ? <CheckCircleFilled /> : <CheckCircleOutlined />}
            <S.StyledCheckText>로그인 상태 유지</S.StyledCheckText>
          </S.StyledTextContain> */}

          <S.StyledFormItem>
            <DarkButton style={{ width: '90%' }} content='로그인' onClick={handleLogin} />
          </S.StyledFormItem>

          <S.StyledTextContain color="#7d7d7d" justifyContent="center" marginBottom="0px">
            <S.Text onClick={() => navigate('/signup')}>회원가입</S.Text>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <S.Text onClick={() => navigate('/find')}>아이디/비밀번호 찾기</S.Text>
          </S.StyledTextContain>

          {/* <Divider>또는</Divider>

          <SocialLogin /> */}
        </S.StyledForm>

      </BasicCard>
    </S.StyledBackgroud>
  );
}

export default Login;
