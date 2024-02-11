import UsageText from "../../component/Info/UsageText";
import ComponentsWrapper from "../../styles/ComponentsWrapper";
import styled from 'styled-components';
import 'animate.css';

const TimelineItem = ({ title, description, isBoxRight }: { title: string, description: string, isBoxRight: boolean }) => {
  return (
    <Timeline className={isBoxRight ? 'box-right' : ''}>
      <Custom />
      <Icon>
        <IconSpan />
      </Icon>
      <Info>
        <InfoTitle>{title}</InfoTitle>
        <InfoDescription>{description}</InfoDescription>
      </Info>
    </Timeline>
  );
};

function Main() {
  return <ComponentsWrapper>
    <>
      <HeaderSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <HeadChip>NEW</HeadChip>
          <HeadText>잇츠 다이어리 OPEN!</HeadText>
          <BodyText>잇츠 다이어리는 친구들과 소중한 추억을 공유하는 공간입니다.<div style={{ marginBottom: "10px" }} />어릴 적 주고받던 교환 일기장을 온라인에서 즐겨보세요 📝</BodyText>
        </div>
        <div>
          <img alt="book_icon" src="/img/3d_book.png" style={{ width: "180px", height: "180px" }} />
        </div>
      </HeaderSection>

      <InfoSection>
        <InfoText className="animate__animated animate__fadeInRight">친구들과</InfoText>
        <InfoText className="animate__animated animate__fadeInRight">속마음을 공유해보세요</InfoText>
        <div style={{ display: "flex", gap: "5rem" }}>

          <InfoBox className="animate__animated animate__fadeInUp" style={{ backgroundColor: "#e8efff" }}>
            <img alt="chat_icon" src="/img/3d_chat.png" style={{ width: "150px", height: "150px" }} />
            <InfoText>일상 기록</InfoText>
          </InfoBox>
          <InfoBox className="animate__animated animate__fadeInUp" style={{ backgroundColor: "#fbebff" }}>
            <img alt="hobby_icon" src="/img/3d_hobby.png" style={{ width: "150px", height: "150px" }} />
            <InfoText>취미 기록</InfoText>
          </InfoBox>
          <InfoBox className="animate__animated animate__fadeInUp" style={{ backgroundColor: "#fff5e8" }}>
            <img alt="secret_icon" src="/img/3d_secret.png" style={{ width: "150px", height: "150px" }} />
            <InfoText>비밀 기록</InfoText>
          </InfoBox>
        </div>
        <div>
          <InfoText className="animate__animated animate__fadeInRight">.</InfoText>
          <InfoText className="animate__animated animate__fadeInRight">.</InfoText>
          <InfoText className="animate__animated animate__fadeInRight">.</InfoText>
        </div>
        <InfoText className="animate__animated animate__fadeInRight">다양한 삶의 기록을</InfoText>
        <InfoText className="animate__animated animate__fadeInRight">남겨요</InfoText>
      </InfoSection>
      {/* 
      <MediaQueryContainer>
        <TimelineItem title="1. 일기방 만들기" description="일기방 이름과 함께 일기방 소개도 작성해주세요." isBoxRight={false} />
        <TimelineItem title="2. 친구 초대하기" description="일기를 공유할 친구들을 초대하세요." isBoxRight={true} />
        <TimelineItem title="3. 일기 작성하기" description="오늘의 기분과 함께 일기를 작성해주세요." isBoxRight={false} />
        <TimelineItem title="4. 일기 공유하기" description="친구와 함께 작성한 일기를 확인하세요." isBoxRight={true} />
      </MediaQueryContainer> */}

      <FooterSection>
        <div style={{ fontSize: "20px", fontWeight: "700" }}>잇츠 다이어리</div>
        <div>Contact itsdiaryservice@gmail.com</div>
        <div>Copyright ⓒ 2024 ITSDIARY. All rights reserved.</div>
      </FooterSection>

    </>
  </ComponentsWrapper>;
}

export default Main;

const HeaderSection = styled.div`
  height: 270px; 
  background-color: #fff0ae;
  display: flex;
  gap: 9rem;
  align-items: center;
  justify-content: center;
  padding: 0 150px;
`

const HeadChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px; 
  width: 80px; 
  border-radius: 100px;
  color: white;
  font-size: 20px;
  font-weight: 600;
  background-image: linear-gradient(to right, #fb4fb3 , #fed24e);
`

const HeadText = styled.div`
  font-size: 40px;
  font-weight: 700;
`

const BodyText = styled.div`
  font-size: 20px;
`

const InfoText = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #606060;
`

const InfoSection = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

const InfoBox = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 10px 10px 20px #dfdfdf;
`

const FooterSection = styled.div`
  height: 270px; 
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
`;

const Timeline = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
`;

const Icon = styled.div`
  display: flex;
  order: 2;
  text-align: center;
  color: #fff;
  font-size: 28px;
  position: relative;
  width: 100px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    background-color: #D9D8FF;
  }
`;

const IconSpan = styled.span`
  z-index: 999;
  font-size: 20px;
  margin: auto;
  background: #D9D8FF;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  line-height: 40px;
`;

const Info = styled.div`
  text-align: center;
  border-radius: 5px;
  padding: 40px 20px;
  color: #383838;
  order: 3;
  width: 80%;
  background: #fff;
  border: solid 1px #D9D8FF;
  transition: all 0.6s ease;

  &:hover {
    background: #D9D8FF;
  }

  margin-bottom: 15%;
`;

const InfoTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  letter-spacing: 2px;
`;

const InfoDescription = styled.p`
  line-height: 1.4;
`;

const Custom = styled.div`
  width: 40%;
`;

const MediaQueryContainer = styled(Container)`
  @media (min-width: 640px) {
    ${Info}, ${Custom} {
      width: 45%;
    }

    .box-right ${Info} {
      order: 1;
    }

    .box-right ${Custom} {
      order: 3;
    }
  }
`;
