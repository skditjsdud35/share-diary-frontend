import styled from 'styled-components';
import { Mentions } from 'antd';


const Container = styled.div`
height: 100%;
overflow: auto;
`
const MyProfileWrapper = styled.div`
    margin-top:30px
`

const ImgBox = styled.div`
width: 100px;
height: 100px; 
border-radius: 70%;
overflow: hidden;
margin: 0 auto;
border-style: solid;
border-width: 1px;
color: #c8c8c8;
margin-bottom: 20px;
`
const ProfileImg = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const ProfileText = styled.div`
font-size: 20px;
text-align: center;
`

const InfoText = styled.div`
font-size: 15px;
margin-bottom: 5px;
`

const MyMentions = styled(Mentions)`
margin-bottom: 20px;
width: 100%;
`

const MentionBox = styled(Mentions)`
margin-bottom: 20px;
width: 100%;
`

const LinkText = styled.span`
float: right; 
color: ${props => props.color === "blue" ? "#155bfe" : "red"};
cursor: pointer;
&:hover {
    color: ${props => props.color === "blue" ? "#3392ff" : "#ff7373"};
}

`

export { Container, MyProfileWrapper, ImgBox, ProfileImg, ProfileText, InfoText, MyMentions, MentionBox, LinkText }

