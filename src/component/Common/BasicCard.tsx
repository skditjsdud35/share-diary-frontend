import React from 'react'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const BasicCard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <CardWrap>
      <CloseButton onClick={() => navigate(-1)}>X</CloseButton>
      {children}
    </CardWrap>
  )
}

export default BasicCard

const CardWrap = styled.div`
  position: relative;
  width: 400px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
  padding : 40px;

  @media screen and (max-width: 500px) {
    width: 90%;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`