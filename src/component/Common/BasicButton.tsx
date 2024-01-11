import React from 'react'
import styled from "styled-components";

const BasicButton = ({ content }: { content: string }) => {
    return (
        <ButtonWrap>{content}</ButtonWrap>
    )
}

export default BasicButton;

const ButtonWrap = styled.button`
    display: block;
    background: white;
    color: #6664FF;
    font-size: 16px;
    border: solid 1px #CCCCCC;
    width: 90%;
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