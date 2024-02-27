import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadDataSection = () => {
    return (
        <CenteredWrapper>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#6664FF' }} spin />} />
        </CenteredWrapper>
    )
}

export default LoadDataSection

const CenteredWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;
