import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMedal } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { loginState } from "../../atom/loginState";
import { useRecoilState, useRecoilValue } from "recoil";
import { diaryListState, diaryUpdateState } from "../../atom/recoil";
import { selectedDiaryId } from "../../atom/diary";
import BasicButton from "../Common/BasicButton";
import Modal from "../Modal/SideMenuModal";
import { useMediaQuery } from "react-responsive";
import axiosInstance from "../../utils/TokenRefresher";
import LoadDataSection from '../../component/Common/LoadDataSection';
import InfiniteScroll from 'react-infinite-scroll-component';


function MenuList(props: { isMenuOpen: boolean }) {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(loginState);
  const diaryUpdate = useRecoilValue(diaryUpdateState);
  const [diaryList, setDiaryList] = useRecoilState(diaryListState);
  const [diaryId, setDiaryId] = useRecoilState(selectedDiaryId);
  const { diaryRoom } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  let accessToken = localStorage.getItem('login-token');
  const limit = 5;

  const fetchData = () => {
    if (isLoggedIn) {
      axiosInstance
        .get("/api/v0/diary-rooms", {
          headers: { Authorization: accessToken },
          params: {
            limit: limit,
            lastDiaryId: lastId
          }
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              setDiaryList(prevState => [...prevState, ...res.data]);
              const lastItemId = res.data[res.data.length - 1].id;
              console.log(lastItemId)
              setLastId(lastItemId);
            } else {
              setHasMore(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [diaryUpdate]);


  const showModal = (create: boolean) => {
    setIsCreate(create);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const width860 = useMediaQuery({
    query: "(max-width:860px)",
  });

  return (
    <>
      <Modal
        visible={isModalVisible}
        closeModal={closeModal}
        isCreate={isCreate}
      />
      <ListWrap display={props.isMenuOpen ? "block" : "none"}>
        <div onClick={() => showModal(true)}>
          <BasicButton content="+&nbsp;일기방 만들기" style={width860 ? { width: '50%', marginTop: '20px' } : { marginTop: '20px' }} />
        </div>
        <RoomWrap id="scrollableDiv">
          <InfiniteScroll
            dataLength={diaryList.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<LoadDataSection />}
            scrollableTarget="scrollableDiv"
          >
            {diaryList.length !== 0 ? (
              diaryList.map((i) => (
                <Link to={`/room/${String(i.id)}`}>
                  <Room
                    className={String(i.id) === diaryRoom ? "focus" : ""}
                    key={i.id}
                    onClick={() => setDiaryId(i.id)}
                  >
                    {i.name}
                  </Room>
                </Link>
              ))
            ) : (
              <li className="new-diary">새로운 일기방을 만들어주세요</li>
            )}
          </InfiniteScroll>
        </RoomWrap>
      </ListWrap>
    </>
  );
}

export default MenuList;

const ListWrap = styled.div<{ display: string }>`
  font-size: 1rem;
  display: ${(props) => props.display};
  overflow: hidden;
  height:100vh;

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
  height: 70vh;
  overflow: auto;
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