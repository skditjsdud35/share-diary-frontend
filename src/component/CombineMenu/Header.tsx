import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isMenuOpenState } from "../../atom/uiAtom";
import { loginState } from "../../atom/loginState";
import RoundButton from "../Common/RoundButton";
import { Dropdown, Menu } from 'antd';
import axiosInstance from "../../utils/TokenRefresher";
import { diaryListState } from "../../atom/recoil";


function Header() {
  const setIsMenuOpen = useSetRecoilState(isMenuOpenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [count, setCount] = useState(0);
  const [diaryList, setDiaryList] = useRecoilState(diaryListState);
  let navigate = useNavigate();
  let accessToken = localStorage.getItem('login-token');


  //로그아웃
  const handleLogout = () => {
    axiosInstance({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token"),
      },
      url: "/api/auth/logout",
    }).then((response) => {
      setIsLoggedIn(false);
      setDiaryList([]);
      localStorage.removeItem("login-token");
      navigate("/");
    })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case '1':
        navigate("/myprofile");
        break;
      case '2':
        navigate("/noti");
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">마이 페이지</Menu.Item>
      <Menu.Item key="2">알림 내역</Menu.Item>
    </Menu>
  );


  return (
    <HeaderWrap>
      <div>
        <Icon
          icon={faBars}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
        <h1 onClick={() => { navigate("/"); }} style={{ cursor: "pointer" }}>잇츠 다이어리</h1>
      </div>
      <div>
        {isLoggedIn ?
          <>
            <span style={{ position: "absolute", top: "35%", right: "105px", marginRight: "10px" }}>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                <a>
                  <img alt="user-profile" src="/img/user-profile.png" style={{ cursor: "pointer", width: "28px", height: "28px" }} />
                </a>
              </Dropdown>
            </span>
            <RoundButton content="로그아웃" onClick={handleLogout} />
          </> :
          <RoundButton content="로그인" onClick={() => { navigate("/userLogin") }} />}
      </div>
    </HeaderWrap >
  );
}

export default Header;

const Icon = styled(FontAwesomeIcon)`
  font-size:25px;
`

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid #d9d9d9;
  padding: 0.75rem 1rem;
  position: relative;
  height: 60px;
  // background: #333333;
  background: white;

  h1 {
    font-weight: bold;
    display: inline-block;
    padding-left: 1rem;
    margin-top: 1px;
    cursor: pointer;
  }


`;


