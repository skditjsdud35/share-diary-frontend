import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuList from "./MenuList";
import SideMenuBtn from "./SideMenuBtn";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { isMenuOpenState } from "../../atom/uiAtom";
import BasicButton from "../Common/BasicButton";
import { diaryListState } from "../../atom/recoil";

function CombineMenu() {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenuOpenState);
  const [delay, setDelay] = useState(false);
  const [showText, setShowText] = useState(false);
  const [diaryList, setDiaryList] = useRecoilState(diaryListState);

  const width860 = useMediaQuery({
    query: "(max-width:860px)",
  });

  useEffect(() => {
    if (isMenuOpen) {
      setDelay(true);
      setTimeout(() => {
        setShowText(true);
      }, 500);
    } else {
      setDiaryList([])
      setShowText(false);
      setDelay(false);
    }
  }, [isMenuOpen]);

  return (
    <CombineNav className="menu" width={isMenuOpen ? "240px" : "0px"}>
      {width860 ? (
        <FontAwesomeIcon
          icon={faXmark}
          className="close"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}

      {showText ? <>
        <MenuList isMenuOpen={delay} />
        <SideMenuBtn isMenuOpen={delay} />
      </> : <></>}
    </CombineNav>
  );
}

export default CombineMenu;

const CombineNav = styled.nav<{ width: string }>`
  border-right: 1px solid #d9d9d9;
  box-shadow: 1px 0px 5px #d9d9d9;
  background: #F2F2FF;
  width: ${(props) => props.width};
  transition: width 0.5s ease-in-out;

  .close {
    position: absolute;
    right: 2rem;
    top: 2rem;
    font-size: 20px;
  }
  }
`;
