import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { getDiaryRooms } from '../../api/Fetcher'
import { Room } from '../../types/types'
import { useQuery } from 'react-query';
import NoDataSection from '../Common/NoDataSection';
import { useRecoilState } from "recoil";
import { delegateRoomId, loginId, delegateModalShow, isDelegate } from '../../atom/diary';
import DelegateModal from '../Modal/DelegateModal'
import BasicButton from '../Common/BasicButton';

function DeleteRoom() {
    const accessToken = localStorage.getItem('login-token');
    const [roomId, setRoomId] = useRecoilState(delegateRoomId);
    const [modalShow, setModalShow] = useRecoilState(delegateModalShow);
    const [id, setId] = useRecoilState(loginId);
    const [isDelegateHost, setIsDelegateHost] = useRecoilState(isDelegate);

    //일기 조회
    const { data: diaryRoomData, isLoading } = useQuery(
        ['diaryRoomData'], () => getDiaryRooms({
            token: String(accessToken)
        }), {
        staleTime: Infinity,
    });

    const handleClick = ({ createBy, roomId }: { createBy: string, roomId: number }) => {
        id === createBy ? setIsDelegateHost(true) : setIsDelegateHost(false)
        setRoomId(roomId)
        setModalShow(true);
    }

    if (isLoading) {
        return <>로딩중입니다...</>
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
                    <NoDataSection content='나갈 수 있는 일기방이 없어요' fontSize='16px' />
                )}
            </Card >
        </>
    );
}

export default DeleteRoom;

