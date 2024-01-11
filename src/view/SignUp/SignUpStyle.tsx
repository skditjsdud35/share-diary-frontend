import styled from 'styled-components';
import { Button, Card, Form, Input, Typography } from 'antd';

//색상 차트
const colors = {
    lightgrey: "#ababab",
    darkgrey: "#7d7d7d",
    blue: "#4287f5",
    background: "#f5f6fa"
};

const StyledBackgroud = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #F2F2FF;
  `;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    font-size : 20px;
    font-weight: bold;
    margin-bottom: 15px;
  `;



const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const FormItemWraper = styled.div`
  display: flex;
`;

const SuccessMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    font-size: 20px;
    font-weight: bold;
`;

export { Title, StyledBackgroud, CardHeader, FormItemWraper, SuccessMessage }

