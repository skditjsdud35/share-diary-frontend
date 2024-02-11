import React, { CSSProperties } from 'react';
import styled from "styled-components";

type ButtonProps = {
    content: string;
    loading?: boolean;
    disabled?: boolean;
    selected?: boolean;
    htmlType?: "button" | "submit" | "reset";
    onClick?: () => void;
    style?: CSSProperties;
}

const BasicButton = ({ content, selected, ...props }: ButtonProps) => {
    return (
        <ButtonWrap selected={selected} {...props}>
            <span>{content}</span>
        </ButtonWrap>
    )
}


export default BasicButton;

const ButtonWrap = styled.button<{ selected?: boolean }>`
    width: 90%;
    display: block;
    color: #6664FF;
    font-size: 16px;
    border: solid 1px #CCCCCC;
    margin: 0 auto;
    padding: 0.625rem 0;
    border-radius: 6px;
    cursor: pointer;

    background: ${(props) => props.selected ? '#D9D8FF' : 'white'};
    font-weight: ${(props) => props.selected ? 'bold' : 'semi-bold'};

    &:hover {
      background: #D9D8FF;
      font-weight: bold;
    }

`