import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'antd';
import { useMediaQuery } from 'react-responsive'
import { loginState } from "../../atom/loginState";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/TokenRefresher';
import { useRecoilState } from "recoil";
import { Noti } from '../../types/types'
import ComponentsWrapper from '../../styles/ComponentsWrapper';
import DarkButton from '../../component/Common/DarkButton';
import BasicButton from '../../component/Common/BasicButton';
import NoDataSection from '../../component/Common/NoDataSection';

function NotiList() {

    let navigate = useNavigate();
    let accessToken = localStorage.getItem('login-token');
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [sortedList, setSortedList] = useState<any[]>([]);

    useEffect(() => {
        axiosInstance.get('/api/v0/member-invite-histories', {
            headers: { Authorization: accessToken },
            params: {
                limit: 10,
            }
        }).then((res) => {
            if (res.status === 200) {
                setSortedList(res.data.data);
            }
        })
    }, []);


    // 수락 & 거절
    const handleButtonClick = (action: string, id: number, index: number) => {
        const updatedList = [...sortedList];
        const historyId = id

        axiosInstance({
            method: "PATCH",
            url: `/api/v0/member-invite-histories/${historyId}`,
            data: {
                status: action,
            },
        })
            .then(res => {
                if (action === 'ACCEPT') {
                    updatedList[index] = { ...sortedList[index], status: 'ACCEPT' };
                } else {
                    updatedList[index] = { ...sortedList[index], status: 'DENY' };
                }
                setSortedList(updatedList);
            })
            .catch(error => {
                alert("에러가 발생하였습니다")
            });
    };


    return (
        <ComponentsWrapper>
            <Container>
                {sortedList ? (
                    sortedList.map((item: Noti, index: number) => (
                        <>
                            <MyCard>
                                <NotiContainer>
                                    {(() => {
                                        switch (item.status) {
                                            case "INVITE": case "RE_INVITE":
                                                return <>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <AllTxt key={index}><NotiTxt>{item.hostUserNickname}</NotiTxt>님이 <NotiTxt>{item.diaryRoomName}</NotiTxt>에 초대하였습니다.</AllTxt>
                                                        <DateText>{item.inviteDate}</DateText>
                                                    </div >
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <DarkButton style={{ width: '100px', marginRight: '20px' }} content="수락" onClick={() => handleButtonClick("ACCEPT", item.id, index)} />
                                                        <BasicButton style={{ width: '100px' }} content="거절" onClick={() => handleButtonClick("DENY", item.id, index)} />
                                                    </div>

                                                </>
                                            case "ACCEPT":
                                                return <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AllTxt key={index}><NotiTxt>{item.hostUserNickname}</NotiTxt>님이 보낸 <NotiTxt>{item.diaryRoomName}</NotiTxt> 초대에 수락하셨습니다.</AllTxt>
                                                    <DateText>{item.inviteDate}</DateText>
                                                </div>
                                            case "DENY":
                                                return <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <AllTxt key={index}><NotiTxt>{item.hostUserNickname}</NotiTxt>님이 보낸 <NotiTxt>{item.diaryRoomName}</NotiTxt> 초대에 거절하셨습니다.</AllTxt>
                                                    <DateText>{item.inviteDate}</DateText>
                                                </div>
                                        }
                                    })()}
                                </NotiContainer>
                            </MyCard >
                        </>))) : (
                    <NoDataSection content='알림 내역이 없어요' fontSize="24px" />
                )
                }
            </Container>
        </ComponentsWrapper >
    );
}

export default NotiList;

const Container = styled.div`
    height: 100%;
    overflow: auto;
`
const MyCard = styled(Card)`
    width: 90%;
    margin: 20px auto;
    border-color: #c0c0c0;
    display: flex;
    flex-direction: column;
    
`

const DateText = styled.div`
    font-size: 10px;
    color: #999999;
    margin-left : 7px;
    margin-top: 5px;
`
const NotiContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const NotiTxt = styled.div`
    color: #8281FF;
    margin-top : 7px;
    font-weight : bold;
    display: inline-block;
`

const AllTxt = styled.div`
    font-size: 18px;
`