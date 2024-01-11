import Tab from '../../component/Common/Tab';
import BasicCard from '../../component/Common/BasicCard';
import FindId from '../../component/FindMyInfo/FindId';
import SetPw from '../../component/FindMyInfo/SetPw';
import * as S from './FindIdPwStyle'

const data = [
    {
        id: 0,
        title: '아이디 찾기',
        section: <FindId />,
    },
    {
        id: 1,
        title: '비밀번호 재설정',
        section: <SetPw />,
    },
];

function FindIdPw() {


    return (
        <S.StyledBackgroud>
            <BasicCard>
                <Tab data={data} />
            </BasicCard>
        </S.StyledBackgroud>
    );

}

export default FindIdPw;

