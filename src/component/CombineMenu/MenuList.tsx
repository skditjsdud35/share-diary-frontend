import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMedal } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { loginState } from "../../atom/loginState";
import { useRecoilState, useRecoilValue } from "recoil";
import { diaryListState, diaryUpdateState } from "../../atom/recoil";
import BasicButton from "../Common/BasicButton";
import Modal from "../Modal/SideMenuModal";

function MenuList(props: { isMenuOpen: boolean }) {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(loginState);
  const diaryUpdate = useRecoilValue(diaryUpdateState);
  const [diaryList, setDiaryList] = useRecoilState(diaryListState);
  const { diaryRoom } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("/api/v0/diary-rooms", {
          headers: { Authorization: localStorage.getItem("login-token") },
          params: {
            limit: 10
          }
        })
        .then((res) => {
          if (res.status === 200) {
            if (isLoggedIn) return setDiaryList(res.data);
          }
        })
        .catch((error) => {
          console.log(localStorage.getItem("login-token"))
          console.log(error, "menuList");
        });
    }
  }, [diaryUpdate, setDiaryList]);


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
      <ListWrap display={props.isMenuOpen ? "block" : "none"}>
        <div onClick={() => showModal(true)}>
          <BasicButton content="+&nbsp;일기방 만들기" />
        </div>
        {/* <div className="ranking-tab" onClick={() => navigate("/ranking")}>
        일기방 랭킹
        <FontAwesomeIcon icon={faMedal} />
      </div> */}
        <RoomWrap>
          {diaryList.length !== 0 ? (
            diaryList.map((i) => (
              <Link to={`/room/${String(i.id)}`}>
                <Room
                  className={String(i.id) === diaryRoom ? "focus" : ""}
                  key={i.id}
                >
                  {i.name}
                </Room>
              </Link>
            ))
          ) : (
            <li className="new-diary">새로운 일기방을 만들어주세요</li>
          )}
        </RoomWrap>
      </ListWrap>
    </>
  );
}

export default MenuList;

const ListWrap = styled.div<{ display: string }>`
  font-size: 1rem;
  display: ${(props) => props.display};

  .search {
    padding: 0px 12px;
    margin-right: 50px;
    border-radius: 20px;
    border: 1px solid #d6d6d6;
    display: flex;
    align-items: center;
    background: #fff;
    margin-bottom: 20px;

    svg {
      margin-bottom: -2px;
      padding-right: 6px;
      color: #999;
    }

    input {
      height: 36px;
    }
  }

  .new-diary {
    color: #B3B3B3;
    font-size: 13px;
  }

  .ranking-tab {
    padding: 20px 0;
    color: #8685ef;
    font-weight: bold;

    svg {
      padding-left: 6px;
    }
  }


a {
  color: #4D4D4D;
  text-decoration: none;
}


  }
`;

const RoomWrap = styled.div`
  padding: 20px 0 ;
`

const Room = styled.div`
padding: 20px 10px;
margin-left: 10px
cursor: pointer;

svg {
  padding: 0 6px;
}

&:hover {
  background: white;
}

&.focus {
  font-weight: bold;
  background: #DCDCFF;
}
`