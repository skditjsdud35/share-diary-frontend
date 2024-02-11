import styled from "styled-components";
import React, { useState } from 'react';

interface TabData {
    id: number;
    title: string;
    section: JSX.Element;
}

interface TabButtonProps {
    active: boolean;
}

const Tab = ({ data }: { data: TabData[] }) => {
    const [index, setIndex] = useState<number>(0);

    return (
        <>
            <TabWrap>
                {data.map(item => (
                    <TabButton
                        key={item.id}
                        active={index === item.id}
                        onClick={() => setIndex(item.id)}
                    >
                        {item.title}
                    </TabButton>
                ))}
            </TabWrap>
            {data.find(item => item.id === index)?.section}
        </>
    );
};

export default Tab;

const TabWrap = styled.div`
    display: flex;
    margin-bottom: 20px;
`
const TabButton = styled.button<TabButtonProps>`
    position: relative;
    margin-right: 20px;
    font-size: 16px;
    color: ${props => props.active ? '#6664FF' : '#808080'};
    font-weight: ${props => props.active ? 600 : 'normal'};
    text-decoration: none;

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: ${props => props.active ? '100%' : '0'};
        height: 2px;
        background-color: #6664FF;
        transition: all 0.3s ease;
        transform: ${props => props.active ? 'translateX(-50%)' : 'translateX(0)'};
    }
`
