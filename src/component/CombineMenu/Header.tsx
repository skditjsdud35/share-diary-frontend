import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isMenuOpenState } from "../../atom/uiAtom";
import { loginState } from "../../atom/loginState";
import axios from "axios";
import { Avatar, Badge } from 'antd';
import { Noti } from "../../types/types"
import { useQuery } from 'react-query';
import { getNotiList } from '../../api/Fetcher'


function Header() {
  const setIsMenuOpen = useSetRecoilState(isMenuOpenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [count, setCount] = useState(0);
  let navigate = useNavigate();
  let accessToken = localStorage.getItem('login-token');


  const { data: notiData } =
    useQuery({
      queryKey: ['notiData'],
      queryFn: () => getNotiList(String(accessToken))
    })

  //알림갯수
  const countNoti = (data: Noti[]) => {
    const acceptedItems: Noti[] = data?.filter(item => item.status === "INVITE");
    return acceptedItems?.length || 0;
  }


  //로그아웃
  const handleLogout = () => {
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token"),
      },
      url: "/api/auth/logout",
    }).then((response) => {
      setIsLoggedIn(false);
      localStorage.removeItem("login-token");
      navigate("/");
    });
  };

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
            <span style={{ position: "absolute", top: "35%", right: "105px" }}
              onClick={() => {
                navigate("/mypage");
              }}>
              <Badge size="small" count={notiData ? Number(countNoti(notiData?.data)) : 0}>
                <Icon icon={faUser} />
              </Badge>
            </span>
            <Login
              className="login-btn"
              onClick={handleLogout}>로그아웃</Login>
          </> :
          <>
            <Login
              className="login-btn"
              onClick={() => {
                navigate("/userLogin");
              }}>로그인</Login>
          </>}
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

const Login = styled.div`
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  display: inline-block;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  margin-left: 20px;
`;

