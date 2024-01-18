import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Mentions, Button, Select } from 'antd';
import PwModal from '../../component/Modal/ChangePasswordModal'
import InfoModal from '../../component/Modal/ChangeInfoModal'
import axios from 'axios'
import { useRecoilState } from "recoil";
import { loginState } from "../../atom/loginState";
import { memberEmail } from "../../atom/diary"
import useModal from '../../hooks/useModal';
import ComponentsWrapper from '../../styles/ComponentsWrapper';
import * as S from './MyProfileStyle'
import DeleteRoom from '../../component/Mypage/DeleteRoom';
import axiosInstance from '../../utils/TokenRefresher';

function MyProfile() {
    let navigate = useNavigate();
    let accessToken = localStorage.getItem('login-token');
    const [isPwModalVisible, showPwModal, closePwModal] = useModal();
    const [isInfoModalVisible, showInfoModal, closeInfoModal] = useModal();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useRecoilState(memberEmail);
    const [id, setId] = useState<string>('');
    const getCookie = (name: string) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    useEffect(() => {
        if (!isLoggedIn) {
            // navigate('/');
        } else {
            axios({
                method: "GET",
                url: '/api/member/myPage',
                headers: { Authorization: accessToken }
            })
                .then(res => {
                    setEmail(res.data.email)
                    setNickname(res.data.nickName)
                    setId(res.data.loginId)

                })
                .catch(res => {
                    if (res.response.status === 401) {
                        axios({
                            method: "GET",
                            url: '/api/auth/token'
                        })
                    }
                })
        }
    }, [isLoggedIn, navigate, accessToken]);

    return (
        <ComponentsWrapper>
            <S.MyProfileWrapper>
                <PwModal visible={isPwModalVisible} closeModal={closePwModal} />
                <InfoModal
                    visible={isInfoModalVisible}
                    closeModal={closeInfoModal}
                    email={email}
                    nickName={nickname}
                />
                <S.Container>
                    <S.ImgBox>
                        <S.ProfileImg src='img/profile_icon.png' />
                    </S.ImgBox>
                    <S.ProfileText>{id}</S.ProfileText>
                    <Card style={{ width: '90%', margin: '20px auto', borderColor: '#c0c0c0' }} title="기본 정보">
                        <S.InfoText>이메일</S.InfoText>
                        <S.MyMentions
                            value={email}
                            readOnly
                        />
                        <S.InfoText>닉네임
                            <Button style={{ float: 'right', marginBottom: '10px' }} onClick={() => showInfoModal()}>수정</Button>
                        </S.InfoText>
                        <S.MyMentions
                            value={nickname}
                            onChange={(value) => { setNickname(value); }}
                        />
                        <S.InfoText>비밀번호
                            <S.LinkText color="blue" onClick={() => showPwModal()}> 비밀번호 변경 →</S.LinkText>
                        </S.InfoText>
                        <S.MyMentions
                            defaultValue="***********"
                            readOnly
                        />
                    </Card>
                    {/* <Card style={{ width: '90%', margin: '20px auto', marginBottom: '100px', borderColor: '#c0c0c0' }} title="추가 정보">
                        <S.InfoText>
                            나의 랭킹
                            <S.LinkText color="blue" onClick={() => navigate("/ranking")}> 랭킹 점수 보러가기 →</S.LinkText>
                        </S.InfoText>
                        <S.MyMentions
                            defaultValue="123위"
                            readOnly
                        />
                        <S.InfoText>그동안 쓴 일기</S.InfoText>
                        <S.MyMentions
                            defaultValue="3921개"
                            readOnly
                        />
                        <S.InfoText>메달 획득 갯수</S.InfoText>
                        <S.MyMentions
                            defaultValue="🥇 12개  🥈 3개  🥉 23개"
                            readOnly
                        /> 
                    </Card> */}
                    <DeleteRoom />
                </S.Container >
            </S.MyProfileWrapper>
        </ComponentsWrapper>
    );
}

export default MyProfile;