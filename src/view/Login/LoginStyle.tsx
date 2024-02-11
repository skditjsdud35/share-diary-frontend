import styled from 'styled-components';
import { Form, Input } from 'antd';

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

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
  `;

const StyledFormItem = styled(Form.Item)`
    width: 100%;
    margin-bottom: 20px;
  `;

interface Container {
    justifyContent: string;
    color: string;
    marginBottom: string;
};

const StyledTextContain = styled.div<Container>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.justifyContent};
    color: ${(props) => props.color};
    cursor: pointer;
    width: 100%;
    margin-bottom: ${(props) => props.marginBottom};
    font-size : 12px;
  `;

const StyledCheckText = styled.span`
    color: ${colors.darkgrey};
    margin-left: 5px;
  `;

const Text = styled.span`
    display: flex;
    align-items: center;
    color: ${colors.darkgrey};
    cursor: pointer;
    justify-content: start;
  
    &:hover{
      color : #6664FF
    }
  `;

export { StyledBackgroud, Title, StyledForm, CardHeader, StyledFormItem, StyledTextContain, StyledCheckText, Text };