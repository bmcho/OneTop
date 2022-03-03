import styled from 'styled-components';
import Image from 'next/image';
import SelectFromCategory from '../src/components/recommend/SelectFromCategory';
import RecommendTitle from '../src/components/recommend/RecommendTitle';

const recommend = (props) => {
  return (
    <RecommendBlock>
      <RecommendTitle />
      <SurveyBlock>
        <EssentialBlock>
          <EssentialTitle>
            <span>필수</span>
            필수 입력 항목입니다
          </EssentialTitle>
          <Essential>
            <dt>어떤 화장품을 찾고 계신가요?</dt>
            <dd>
              <SelectFromCategory />
            </dd>
          </Essential>
        </EssentialBlock>
      </SurveyBlock>
    </RecommendBlock>
  );
};

const RecommendBlock = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

const SurveyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EssentialBlock = styled.article`
  width: 100%;
`;
const EssentialTitle = styled.div`
  span {
    padding: 8px 15px;
    background-color: ${({ theme }) => theme.color.yellow2};
    border-radius: 20px;
    font-size: 15px;
    font-weight: 900;
    margin-right: 20px;
  }
`;

const Essential = styled.dl`
  dt {
    font-weight: 900;
    margin-bottom: 30px;
  }
  padding: 40px;
`;

export default recommend;
