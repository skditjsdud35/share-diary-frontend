import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'antd';
import { useMediaQuery } from 'react-responsive'
import { loginState } from "../../atom/loginState";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useRecoilState } from "recoil";
import { useQuery, useInfiniteQuery } from 'react-query';
import { getNotiList } from '../../api/Fetcher'
import { Noti } from '../../types/types'
import ComponentsWrapper from '../../styles/ComponentsWrapper';
import DarkButton from '../../component/Common/DarkButton';
import BasicButton from '../../component/Common/BasicButton';

function NotiList() {

    let navigate = useNavigate();
    let accessToken = localStorage.getItem('login-token');
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [sortedList, setSortedList] = useState<any[]>([]);

    const { data: notiData } =
        useQuery({
            queryKey: ['notiData'],
            queryFn: () => getNotiList(String(accessToken))
        })


    // useEffect(() => {

    //     if (notiData?.data) {
    //         const sortedData = sortNotiData(notiData.data);
    //         setSortedList(sortedData);
    //     }
    // }, [notiData]);


    // const sortNotiData = (notiList: Noti[]) => {
    //     return notiList.sort((a: Noti, b: Noti) => {
    //         return new Date(b.inviteDate).valueOf() - new Date(a.inviteDate).valueOf();
    //     });
    // };

    // 수락 & 거절
    const handleButtonClick = (action: string, id: number, index: number) => {
        const updatedList = [...sortedList];
        const historyId = id

        axios({
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
                // Handle error
            });
    };


    return (
        <ComponentsWrapper>
            <Container>
                {notiData?.data?.map((item: Noti, index: number) => (
                    <>
                        {/* <DateText key={index}>{item.inviteDate}</DateText> */}
                        {item.status !== "CANCEL" && (
                            <MyCard>
                                <NotiContainer>
                                    {(() => {
                                        switch (item.status) {
                                            case "INVITE": case "RE_INVITE":
                                                return <>
                                                    <div key={index}><NotiTxt>{item.hostUserId}</NotiTxt>님이 <NotiTxt>{item.diaryRoomName}</NotiTxt>에 초대하였습니다.</div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                                                        <DarkButton content="수락" onClick={() => handleButtonClick("ACCEPT", item.id, index)} />
                                                        <BasicButton content="거절" onClick={() => handleButtonClick("DENY", item.id, index)} />
                                                    </div>

                                                </>
                                            case "ACCEPT":
                                                return <div key={index}><NotiTxt>{item.hostUserId}</NotiTxt>님이 보낸 <NotiTxt>{item.diaryRoomName}</NotiTxt> 초대에 수락하셨습니다.</div>
                                            case "DENY":
                                                return <div key={index}><NotiTxt>{item.hostUserId}</NotiTxt>님이 보낸 <NotiTxt>{item.diaryRoomName}</NotiTxt> 초대에 거절하셨습니다.</div>
                                        }
                                    })()}
                                </NotiContainer>
                            </MyCard>
                        )
                        }
                    </>
                ))}
            </Container>
        </ComponentsWrapper>
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
    font-size: 20px;
    width: 90%;
    margin-left: 20px auto;
`
const NotiContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const NotiTxt = styled.div`
    color: #6495ED;
    margin-top : 7px;
    font-weight : bold;
    display: inline-block;
`

const MyButton = styled(Button)`
    margin : 3px;
    padding: 0 30px;
    float: right;
`
