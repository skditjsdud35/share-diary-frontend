import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal/SideMenuModal";
import { useNavigate, useParams } from "react-router-dom";
import BasicButton from "../Common/BasicButton";

function SideMenuBtn(props: { isMenuOpen: boolean }) {
  let navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const { diaryRoom } = useParams();

  const showModal = (create: boolean) => {
    setIsCreate(create);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        closeModal={closeModal}
        isCreate={isCreate}
      />
      <BtnsWrap display={props.isMenuOpen ? "block" : "none"}>
        <div onClick={() => {
          navigate("/write", { state: { modify: false } });
        }}>
          <BasicButton content="오늘의 일기쓰기" />
        </div>

        {diaryRoom !== undefined && (
          <div onClick={() => showModal(false)}>
            <BasicButton content="일기방 초대하기" />
          </div>
        )}
      </BtnsWrap>
    </>
  );
}

export default SideMenuBtn;

const BtnsWrap = styled.div<{ display: string }>`
  width: 100%;
  display: ${(props) => props.display};
  position: absolute;
  right: 0;
  bottom: 25px;
  }
`;
