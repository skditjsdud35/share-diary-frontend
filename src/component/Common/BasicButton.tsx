import React, { CSSProperties } from 'react';
import styled from "styled-components";

type ButtonProps = {
    content: string;
    loading?: boolean;
    disabled?: boolean;
    htmlType?: "button" | "submit" | "reset";
    onClick?: () => void;
    style?: CSSProperties;
}

const BasicButton = ({ content, ...props }: ButtonProps) => {
    return (
        <ButtonWrap {...props}>
            <span>{content}</span>
        </ButtonWrap>
    )
}


export default BasicButton;

const ButtonWrap = styled.button`
    width: 90%;
    display: block;
    background: white;
    color: #6664FF;
    font-size: 16px;
    border: solid 1px #CCCCCC;
    margin: 20px auto 0;
    padding: 0.625rem 0;
    border-radius: 6px;
    cursor: pointer;
    font-weight: semi-bold;

    &:hover {
      background: #D9D8FF;
      font-weight: bold;
    }
`