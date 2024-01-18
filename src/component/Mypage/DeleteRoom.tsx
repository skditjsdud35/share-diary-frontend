import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Select, Card } from 'antd';
import axios from 'axios'
import { getDiaryRooms, getMember } from '../../api/Fetcher'
import { Room, Member } from '../../types/types'
import { useQuery, useMutation, useQueries } from 'react-query';
import { memberEmail } from "../../atom/diary"
import { useRecoilValue } from "recoil";
import { Modal } from "antd";
import useModal from '../../hooks/useModal';


function DeleteRoom() {
    // const [diaryRooms, setDiaryRooms] = useState<Array<{ value: string; label: string }>>([]);
    // const [selectedRoom, setSelectedRoom] = useState(-1)
    // const [isModalVisible, showModal, closeModal] = useModal();
    // const accessToken = localStorage.getItem('login-token');
    // const email = useRecoilValue(memberEmail);
    // const year = new Date().getFullYear();
    // const month = String(new Date().getMonth() + 1).padStart(2, "0");
    // const date = String(new Date().getDate()).padStart(2, "0");

    // const formattedDate = `${year}-${month}-${date}`;

    // //일기 조회
    // const { data: diaryRoomData, isError: diaryError } = useQuery(
    //     ['diaryRoomData'], () => getDiaryRooms({
    //         token: String(accessToken)
    //     }));

    // //일기방 멤버 조회
    // const { data: memberData, isError: memberError } = useQuery(
    //     ['memberData', selectedRoom], () => getMember({
    //         diaryRoomId: Number(selectedRoom),
    //         searchDate: formattedDate,
    //         token: String(accessToken)
    //     }));

    // if (diaryError) {
    //     return <div>에러가 발생했습니다: {diaryError}</div>;
    // }

    // if (!diaryRoomData) {
    //     return <div>데이터를 로딩 중입니다...</div>;
    // }

    return (
        <Card style={{ width: '90%', margin: '20px auto', marginBottom: '100px', borderColor: '#c0c0c0' }} title="일기방 나가기">
            {/* {diaryRoomData?.map((i: Room) => (
                <div
                    key={i.id}
                    onClick={() => {
                        setSelectedRoom(i.id)
                        showModal()
                    }}
                >
                    {i.name}
                </div>
            ))}
            <Modal
                onCancel={closeModal}
                visible={isModalVisible}
                centered
                title="방장 위임">
                {memberData?.map((i: Member) => (
                    <div key={i?.memberId}>
                        <input
                            value={i?.memberId}
                            name={i?.nickName}
                            type="radio"
                        />
                        {i?.nickName}
                    </div>
                ))}

            </Modal> */}
        </Card>
    );
}

export default DeleteRoom;

const InfoText = styled.div`
    font-size: 15px;
    margin-bottom: 5px;
`

const LinkText = styled.span`
    float: right; 
    color: ${props => props.color === "blue" ? "#155bfe" : "red"};
    cursor: pointer;
    &:hover {
        color: ${props => props.color === "blue" ? "#3392ff" : "#ff7373"};
    }
`