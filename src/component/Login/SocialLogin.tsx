import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useRecoilState } from 'recoil';
import { socialLoginProvider } from '../../atom/loginState';


function SocialLogin() {
    const [provider, setprovider] = useRecoilState(socialLoginProvider);

    const handleGithub = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
        setprovider("github");
    }

    const handleGoogle = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=http://localhost:3000/login/oauth2/callback&response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`
        setprovider("google");
    }

    const handleKakao = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/login/oauth2/callback`
        setprovider("kakao");
    }

    return (
        <>
            <StyledButton onClick={handleGoogle}>
                <StyledImage src={'img/google-icon.png'} />
                <ButtonText>구글 계정으로 로그인</ButtonText>
            </StyledButton>
            <StyledButton onClick={handleGithub}>
                <StyledImage src={'img/github-icon.png'} />
                <ButtonText>깃허브 계정으로 로그인</ButtonText>
            </StyledButton>
            {/* <StyledButton onClick={handleNaver}>
                <StyledImage src={'img/naver-icon.png'} />
                <ButtonText>네이버 계정으로 로그인</ButtonText>
            </StyledButton> */}
            <StyledButton onClick={handleKakao}>
                <StyledImage src={'img/kakao-icon.png'} />
                <ButtonText>카카오톡 계정으로 로그인</ButtonText>
            </StyledButton>
        </>
    );
}

export default SocialLogin;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const StyledImage = styled.img`
  width: 20px;
`;

const ButtonText = styled.span`
  flex: 1;
  text-align: center;
`;
