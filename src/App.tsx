import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Main from "./view/Main/Main";
import WriteDiary from './view/WriteDiary/WriteDiary'
import Ranking from "./view/Ranking/Ranking";
import Login from "./view/Login/Login";
import SignUp from "./view/SignUp/SignUp";
import FindIdPw from "./view/FindIdPw/FindIdPw";
import ResetRecoil from "./component/Common/ResetRecoil";
import DiaryRoom from "./view/DiaryRoom/DiaryRoom";
import Callback from "./utils/Callback";
import CheckUuid from "./utils/CheckUuid";
import styled from "styled-components";
import NotiList from "./view/NotiList/NotiList";
import MyProfile from "./view/MyProfile/MyProfile";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ResetRecoil />
      <EntireContainer>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/room/:diaryRoom" element={<DiaryRoom />} />
          <Route path="/write" element={<WriteDiary />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/userLogin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/find" element={<FindIdPw />} />
          <Route path="/noti" element={<NotiList />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/login/oauth2/callback" element={<Callback />} />
          <Route path="/uuid/:uuid" element={<CheckUuid />} />
        </Routes>
      </EntireContainer>
    </BrowserRouter>
  );
}

export default App;

const EntireContainer = styled.div`
  //background-color: #F2F2FF;
`

