import { useState } from 'react'
import { Modal, Checkbox } from "antd";
import { getMember } from '../../api/Fetcher'
import { Member } from '../../types/types'
import { useQuery } from 'react-query';
import { useRecoilState } from "recoil";
import { delegateRoomId, delegateModalShow, loginId, isDelegate } from '../../atom/diary';
import axiosInstance from "../../utils/TokenRefresher";


interface ModalProps {
    closeModal: () => void;
    visible: boolean;
    isCreate: boolean;
}


const DelegateModal = (props: ModalProps) => {
    const [roomId, setRoomId] = useRecoilState(delegateRoomId);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const accessToken = localStorage.getItem('login-token');
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const date = String(new Date().getDate()).padStart(2, "0");
    const [modalShow, setModalShow] = useRecoilState(delegateModalShow);
    const [isDelegateHost, setIsDelegateHost] = useRecoilState(isDelegate);
    const formattedDate = `${year}-${month}-${date}`;


    //위임하기
    const handleDelegateOk = () => {
        console.log("selectedMemberId : " + selectedMemberId)
        if (!selectedMemberId) {
            alert("위임할 사용자를 선택해주세요")
            return;
        }
        axiosInstance({
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("login-token"),
            },
            data: {
                asIsHostId: loginId,
                toBeHostId: selectedMemberId
            },
            url: `/api/v0/diary-rooms/${roomId}`,
        }).then((response) => {
            console.log(response);
            setModalShow(false);
        })
            .catch((error) => {
                console.log(error);
            });
        setSelectedMemberId(null);
    };

    //일기방 나가기
    const handleDeleteOk = () => {
        axiosInstance({
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("login-token"),
            },
            url: `/api/v0/diary-rooms/${roomId}`,
        }).then((response) => {
            alert("일기방 나가기를 완료했습니다")
        })
            .catch((error) => {
                console.log(error);
            });

    };

    //취소
    const handleCancel = () => {
        setSelectedMemberId(null);
        setModalShow(false);
    };

    const { data: memberData } =
        useQuery(['memberData', modalShow], () => getMember({
            diaryRoomId: roomId,
            searchDate: formattedDate,
            token: String(accessToken)
        }), {
            enabled: !!modalShow,
        })

    return (
        <>
            {isDelegateHost ?
                <Modal
                    centered
                    title="방장 위임"
                    open={props.visible}
                    onOk={handleDelegateOk}
                    onCancel={handleCancel}
                    okText="위임하기"
                    cancelText="취소"
                >
                    {memberData?.map((member: Member) => (
                        <Checkbox
                            key={member?.memberId}
                            onChange={() => setSelectedMemberId(member?.memberId)}>
                            {member?.nickName}
                        </Checkbox>
                    )
                    )}
                </Modal> :
                <Modal
                    centered
                    title="일기방 나가기"
                    open={props.visible}
                    onOk={handleDeleteOk}
                    onCancel={handleCancel}
                    okText="나가기"
                    cancelText="취소" />
            }
        </>
    )
}

export default DelegateModal