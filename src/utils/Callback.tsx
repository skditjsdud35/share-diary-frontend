import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { loginState, socialLoginProvider } from '../atom/loginState';
import { useNavigate } from "react-router-dom";


function Callback() {
    let navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const location = useLocation();
    const rawCode = new URLSearchParams(location.search).get('code');
    const code = rawCode ? encodeURIComponent(rawCode) : '';
    const provider = useRecoilValue(socialLoginProvider);

    useEffect(() => {
        if (code) {
            axios({
                method: "POST",
                url: process.env.REACT_APP_BACKEND_URL + `/api/auth/social/${provider}`,
                data: {
                    code: code
                },
            }).then((res) => {
                console.log(res.data)
                if (res.data.code === "M001") {
                    axios({
                        method: "POST",
                        url: process.env.REACT_APP_BACKEND_URL + '/api/member/signUp/social',
                        data: {
                            id: "tjsdud9999",
                            email: "tjsdud9999@naver.com",
                            nickname: "test1"
                        }
                    }).then((res) => {
                        console.log(res)
                    })
                }
                localStorage.setItem('login-token', res.data.accessToken);
                setIsLoggedIn(true);
                navigate("/");

            })
        }
    }, []);

    return (
        <div>
            <div>로그인 중입니다. </div>
        </div>
    );
}
export default Callback;
