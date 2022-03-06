import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import SelectFromCategory from '../src/components/recommend/SelectFromCategory';
import RecommendTitle from '../src/components/recommend/RecommendTitle';
import { useEffect, useState } from 'react';
import SelectFromKeyword from '../src/components/recommend/SelectFromKeyword';
import { useRouter } from 'next/router';

const recommend = (props) => {
  const router = useRouter();
  const [largeCategoryIndex, setLargeCategoryIndex] = useState(null);

  const selectLargeCategory = (index) => {
    setLargeCategoryIndex(index);
  };

  const resetCategory = () => {
    setLargeCategoryIndex(null);
  };

  return (
    <RecommendBlock>
      <RecommendTitle />
      <SurveyBlock>
        {largeCategoryIndex === null ? (
          <EssentialBlock>
            <EssentialTitle>
              <span>필수</span>
              필수 선택 항목입니다
            </EssentialTitle>
            <Essential>
              <dt>어떤 화장품을 찾고 계신가요?</dt>
              <dd>
                <SelectFromCategory
                  largeCategoryIndex={largeCategoryIndex}
                  selectLargeCategory={selectLargeCategory}
                />
              </dd>
            </Essential>
          </EssentialBlock>
        ) : (
          <SelectFromKeyword
            largeCategoryIndex={largeCategoryIndex}
            resetCategory={resetCategory}
          />
        )}
      </SurveyBlock>
    </RecommendBlock>
  );
};

const RecommendBlock = styled.section`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SurveyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EssentialBlock = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EssentialTitle = styled.div`
  span {
    padding: 8px 15px;
    background-color: ${({ theme }) => theme.color.yellow2};
    border-radius: 20px;
    font-size: 18px;
    font-weight: 900;
    margin-right: 20px;
  }
  width: 1024px;
  @media screen and (max-width: 1080px) {
    width: 90%;
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
