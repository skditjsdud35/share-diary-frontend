import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { getDiaryRooms } from '../../api/Fetcher'
import { Room } from '../../types/types'
import { useQuery } from 'react-query';
import NoDataSection from '../Common/NoDataSection';
import { useRecoilState } from "recoil";
import { delegateRoomId, loginId, delegateModalShow, isDelegate, loginNickname } from '../../atom/diary';
import DelegateModal from '../Modal/DelegateModal'
import BasicButton from '../Common/BasicButton';
import axiosInstance from '../../utils/TokenRefresher';
import LoadDataSection from '../Common/LoadDataSection';

function DeleteRoom() {
    const accessToken = localStorage.getItem('login-token');
    const [roomId, setRoomId] = useRecoilState(delegateRoomId);
    const [modalShow, setModalShow] = useRecoilState(delegateModalShow);
    const [id, setId] = useRecoilState(loginId);
    const [nickname, setNickname] = useRecoilState(loginNickname);
    const [isDelegateHost, setIsDelegateHost] = useRecoilState(isDelegate);

    //일기 조회
    const { data: diaryRoomData, isLoading } = useQuery(
        ['diaryRoomData', modalShow], () => getDiaryRooms({
            token: String(accessToken)
        }));

    const handleClick = ({ createBy, roomId }: { createBy: string, roomId: number }) => {

        nickname === createBy ? setIsDelegateHost(true) : setIsDelegateHost(false);

        setRoomId(roomId)
        setModalShow(true);
    }

    if (isLoading) {
        return <LoadDataSection />
    }

    return (
        <>
            <Card style={{ width: '90%', margin: '20px auto', marginBottom: '100px', borderColor: '#c0c0c0' }} title="일기방 나가기">
                {diaryRoomData?.length > 0 ? (
                    diaryRoomData.map((i: Room) => (
                        <BasicButton
                            key={i.id}
                            content={i.name}
                            style={{ margin: '20px auto' }}
                            onClick={() => handleClick({ createBy: i.createBy, roomId: i.id })} />

                    ))
                ) : (
                    <div style={{ marginBottom: "50px" }}>
                        <NoDataSection content='나갈 수 있는 일기방이 없어요' fontSize='16px' />
                    </div>
                )}
            </Card >
        </>
    );
}

export default DeleteRoom;

