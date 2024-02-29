import { useState, useEffect } from "react";
import ComponentsWrapper from "../../styles/ComponentsWrapper";
import { Card, Space, Button, Input, Divider } from "antd";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginState } from "../../atom/loginState";
import axios from "axios";
import { diaryListState } from "../../atom/recoil";
import { useNavigate } from "react-router-dom";
import { diaryContent } from "../../atom/diary";
import { DiaryContent } from "../../types/types";
import { useLocation } from "react-router-dom";
import BasicButton from "../../component/Common/BasicButton";

const { TextArea } = Input;

function WriteDiary() {
    const [selectedDiary, setSelectedDiary] = useState<number[]>([]);
    const isLoggedIn = useRecoilValue(loginState);
    const diaryList = useRecoilValue(diaryListState);
    const [diary, setDiary] = useRecoilState<DiaryContent[]>(diaryContent);
    const navigate = useNavigate();
    const location = useLocation();
    const { modify } = location.state;
    const [value, setValue] = useState(modify ? String(diary[1]) : "");
    const [selectedFace, setSelectedFace] = useState(modify ? String(diary[2]) : "");
    const [selectedPrivate, setSelectedPrivate] = useState(modify ? String(diary[5]) : "");

    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1;
    const date: number = today.getDate();


    const face = [
        { icon: "img/face-happy.png", text: "GOOD" },
        { icon: "img/face-sceptic.png", text: "BORING" },
        { icon: "img/face-cool.png", text: "REFRESH" },
        { icon: "img/face-muted.png", text: "ANGRY" },
        { icon: "img/face-sad.png", text: "BAD" },
    ];

    const status = [
        { text: "공개", status: "SHOW" },
        { text: "비공개", status: "HIDE" },
    ];

    const handleDiaryClick = (index: number) => {
        if (selectedDiary.includes(index)) {
            setSelectedDiary(
                selectedDiary.filter((selectedIndex) => selectedIndex !== index)
            );
        } else {
            setSelectedDiary([...selectedDiary, index]);
        }
    };

    const handleFaceClick = (text: string) => {
        setSelectedFace(text);
    };

    const validation = () => {
        if (!isLoggedIn) {
            return "로그인이 필요한 서비스입니다.";
        }

        if (diaryList.length === 0) {
            return "일기를 공유할 일기방을 생성해주세요";
        }

        if (value === "") {
            return "일기를 작성해주세요";
        }

        if (selectedFace === "") {
            return "오늘의 기분을 선택해주세요";
        }

        if (selectedDiary.length === 0 && diary.length === 0) {
            return "일기를 올릴 일기방들을 선택해주세요";
        }

        return null;
    };

    const handleClickRegist = () => {
        let accessToken = localStorage.getItem('login-token');
        const errorMessage = validation();
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        if (modify) {
            axios({
                method: "PATCH",
                url: process.env.REACT_APP_BACKEND_URL + `/api/v0/daily-diaries/${diary[3]}`,
                headers: { Authorization: accessToken },
                data: {
                    content: value,
                    feeling: selectedFace,
                    diaryRooms: [diary[4]],
                    status: selectedPrivate
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        alert("일기를 수정했습니다!");
                        // 임시 이동
                        navigate("/");
                    } else {
                        alert("다시 시도해주세요");
                    }
                });
        } else {
            axios({
                method: "POST",
                url: process.env.REACT_APP_BACKEND_URL + '/api/v0/daily-diaries',
                headers: { Authorization: accessToken },
                data: {
                    content: value,
                    feeling: selectedFace,
                    diaryRooms: selectedDiary,
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        alert("오늘의 일기를 올렸습니다!");
                        // 임시 이동
                        navigate("/");
                    } else {
                        alert("다시 시도해주세요");
                    }
                });
        }

    };

    return (
        <ComponentsWrapper>
            <Divider orientation="left">
                <div style={{ fontSize: "30px" }}>
                    {modify ? <>{diary[0]} 오늘의 일기</> : <>{year}년 {month}월 {date}일 오늘의 일기</>}
                </div>
            </Divider>
            <TextArea
                style={{
                    margin: "0 auto",
                    width: "85%",
                    display: "block",
                    marginBottom: "20px",
                    fontSize: "20px",
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="오늘 하루를 글로 표현해주세요"
                autoSize={{ minRows: 8, maxRows: 15 }}
            />

            <Space
                direction="vertical"
                size={16}
                style={{ margin: "0 auto", width: "85%", display: "block" }}
            >
                <Card
                    title="일기방 공개 여부를 선택해주세요."
                    style={{ marginBottom: "20px" }}
                >
                    <div style={{ display: "flex", columnGap: "30px" }}>
                        {status.map((i, index) => {
                            return <BasicButton content={i.text} selected={selectedPrivate === i.status} onClick={() => setSelectedPrivate(i.status)} />;
                        })}
                    </div>
                </Card>
                {modify ? <></> :
                    <Card
                        title="오늘의 기분은 어떠셨나요?"
                        style={{ marginBottom: "20px" }}
                    >
                        <ImageWrap>
                            {face.map((i, index) => (
                                <Image
                                    key={index}
                                    src={i.icon}
                                    style={
                                        selectedFace === i.text
                                            ? { backgroundColor: "#E4D6FF", borderRadius: "50%" }
                                            : {}
                                    }
                                    onClick={() => handleFaceClick(i.text)}
                                />
                            ))}
                        </ImageWrap>
                    </Card>
                }
                <Card title="어느 일기방에 올릴까요?" style={{ marginBottom: "20px" }}>
                    {modify ?
                        <Space wrap>
                            {diaryList?.map((buttonText, index) => (
                                <Button
                                    key={index}
                                    type="primary"
                                    disabled={Number(buttonText.id) !== Number(diary[4])}
                                >
                                    {buttonText.name}
                                </Button>
                            ))}
                        </Space>
                        :
                        <Space wrap>
                            {diaryList.length === 0
                                ? "오늘의 일기를 공유할 일기방을 생성하세요!"
                                : diaryList.map((buttonText, index) => (
                                    <Button
                                        key={index}
                                        type={selectedDiary.includes(index) ? "primary" : "default"}
                                        onClick={() => handleDiaryClick(index)}
                                    >
                                        {buttonText.name}
                                    </Button>
                                ))}
                        </Space>}
                </Card>
            </Space>
            <Button
                type="primary"
                style={{
                    margin: "0 auto",
                    width: "30%",
                    display: "block",
                    marginBottom: "20px",
                }}
                onClick={handleClickRegist}
            >
                등록하기
            </Button>
        </ComponentsWrapper>
    );
}

export default WriteDiary;

const Image = styled.img`
  width: 50px;

  &:hover {
    background-color: #E4D6FF;
    border-radius: 50%;
    
  }
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
