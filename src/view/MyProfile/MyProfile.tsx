import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Mentions, Button, Select } from 'antd';
import PwModal from '../../component/Modal/ChangePasswordModal'
import InfoModal from '../../component/Modal/ChangeInfoModal'
import { useRecoilState } from "recoil";
import { loginState } from "../../atom/loginState";
import { memberEmail, loginId, delegateModalShow, loginNickname } from "../../atom/diary"
import useModal from '../../hooks/useModal';
import ComponentsWrapper from '../../styles/ComponentsWrapper';
import * as S from './MyProfileStyle'
import DeleteRoom from '../../component/Mypage/DeleteRoom';
import axiosInstance from '../../utils/TokenRefresher';
import DelegateModal from '../../component/Modal/DelegateModal';
import DeleteModal from '../../component/Modal/DelegateModal';
import Modal from "../../component/Modal/DelegateModal"


function MyProfile() {
    let navigate = useNavigate();
    let accessToken = localStorage.getItem('login-token');
    const [isPwModalVisible, showPwModal, closePwModal] = useModal();
    const [isInfoModalVisible, showInfoModal, closeInfoModal] = useModal();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [nickname, setNickname] = useRecoilState(loginNickname);
    const [email, setEmail] = useRecoilState(memberEmail);
    const [id, setId] = useRecoilState(loginId);
    const [isDelegateModal, setIsDelegateModal] = useRecoilState(delegateModalShow);
    const [isDelegateCreate, setIsDelegateCreate] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        } else {
            axiosInstance({
                method: "GET",
                url: '/api/member/myPage',
                headers: { Authorization: accessToken }
            })
                .then(res => {
                    setEmail(res.data.email)
                    setNickname(res.data.nickName)
                    setId(res.data.id)
                })
        }
    }, [isLoggedIn, accessToken]);

    return (
        <>
            <Modal
                visible={isDelegateModal}
                closeModal={() => isDelegateModal}
                isCreate={isDelegateCreate}
            />
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
                        <S.ProfileText>{nickname}</S.ProfileText>
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
        </>
    );
}

export default MyProfile;