import React from 'react'
import styled from "styled-components";

type ButtonProps = {
    content: string;
    onClick?: () => void;
}

const RoundButton = ({ content, ...props }: ButtonProps) => {
    return (
        <ButtonWrap {...props}>
            <span>{content}</span>
        </ButtonWrap>
    )
}

export default RoundButton


const ButtonWrap = styled.button`
    font-size: 14px;
    background: white;
    color: #6664FF;
    border: solid 1px #CCCCCC;
    cursor: pointer;
    text-align: center;
    display: inline-block;
    border: 1px solid #d9d9d9;
    border-radius: 20px;
    padding: 0.5rem 1rem;

    &:hover {
      background: #D9D8FF;
      font-weight: bold;
    }
`
