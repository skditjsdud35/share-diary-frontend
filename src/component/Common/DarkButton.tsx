import React, { CSSProperties } from 'react';
import styled from "styled-components";
import { Button } from 'antd';

type ButtonProps = {
    content: string;
    loading?: boolean;
    disabled?: boolean;
    htmlType?: "button" | "submit" | "reset";
    onClick?: () => void;
    style?: CSSProperties;
}

const DarkButton = ({ content, ...props }: ButtonProps) => {
    return (
        <ButtonWrap {...props}>
            <span>{content}</span>
        </ButtonWrap>
    )
}


export default DarkButton;

const ButtonWrap = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #6664FF;
    border: none;
    color: white;
    font-size: 16px;
    margin: 0 auto;
    padding: 20px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: semi-bold;

    &&:hover {
      background: #D9D8FF;
      color: #808080;
    }

    && span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
`