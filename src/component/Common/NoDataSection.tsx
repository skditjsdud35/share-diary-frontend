import React from 'react';
import styled from 'styled-components';

const NoDataSection = ({ content, fontSize }: { content: string, fontSize: string }) => {
    return (
        <CenteredWrapper>
            <TextWrap fontSize={fontSize}>
                {content} 😥
            </TextWrap>
        </CenteredWrapper>
    );
}

export default NoDataSection;

const CenteredWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%
`;

const TextWrap = styled.div<{ fontSize: string }>`
    font-size: ${props => props.fontSize};
    color: #B3B3B3;
    text-align: center;
    display: inline-block;
`;
