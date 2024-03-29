import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { selectDateState } from "../../atom/recoil";

function ShareCalender() {
  const [value] = useState(new Date());
  const setSelectDate = useSetRecoilState(selectDateState);

  const changeDate = (e: any) => {
    const year = new Date(e).getFullYear();
    const month = String(new Date(e).getMonth() + 1).padStart(2, "0");
    const date = String(new Date(e).getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${date}`;
    setSelectDate(formattedDate);
  };

  return (
    <CalenderWrap>
      <Calendar
        value={value}
        calendarType={"US"}
        locale="en"
        next2Label={null}
        prev2Label={null}
        onChange={(e) => changeDate(e)}
      />
    </CalenderWrap>
  );
}

export default ShareCalender;

const CalenderWrap = styled.div`
  margin-top: 2rem;

  .react-calendar {
    width: 70%;
    margin: auto;
    border: 1px solid #dfdfdf;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #dfdfdf;

    .react-calendar__viewContainer {
      /* background: green; */
      height: 506px;
    }

    .react-calendar__month-view {
      height: 100%;
    }

    .react-calendar__month-view__weekdays__weekday {
      padding: 1rem;
    }

    .react-calendar__tile {
      padding: 10px 6.6667px;
      position: relative;
      height: 75px;

      abbr {
        position: absolute;
        top: 1rem;
        left: 1rem;
      }
    }

    .react-calendar__tile--active,
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus,
    .react-calendar__tile--hasActive {
      background: #d6d4e6;
      border-radius: 10px;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      border-radius: 10px;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background: none;
    }

    .react-calendar__year-view,
    .react-calendar__decade-view,
    .react-calendar__century-view {
      width: 50%;
      margin: auto;
    }

    .react-calendar__tile.react-calendar__year-view__months__month {
      abbr {
        position: unset;
      }
    }
  }
`;
