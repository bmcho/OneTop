import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import SelectFromCategory from '../src/components/recommend/SelectFromCategory';
import RecommendTitle from '../src/components/recommend/RecommendTitle';
import { useEffect, useState } from 'react';
import SelectFromKeyword from '../src/components/recommend/SelectFromKeyword';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import RecommendResult from '../src/components/recommend/RecommendResult';

const recommend = (props) => {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [isResult, setIsResult] = useState(false);
  const { selectKeywords } = useSelector((state) => state.productRecommend);

  return (
    <RecommendBlock>
      <RecommendTitle />
      <SurveyBlock>
        <EssentialBlock>
          {/* <EssentialTitle>
            <span>필수</span>
            필수 선택 항목입니다
          </EssentialTitle> */}
          <Essential>
            <dt>{!category ? '어떤 화장품을 찾고 계신가요?' : '카테고리'}</dt>
            <dd>
              {!category ? (
                <SelectFromCategory
                  category={category}
                  setCategory={setCategory}
                />
              ) : (
                <SelectedCategory>
                  <Category>{category}</Category>
                </SelectedCategory>
              )}
            </dd>
            {category && (
              <>
                <dt>{!isResult ? '키워드를 선택해주세요!' : '키워드'}</dt>
                <dd>
                  {!isResult ? (
                    <SelectFromKeyword
                      category={category}
                      setIsResult={setIsResult}
                    />
                  ) : (
                    <SelectedCategory>
                      {selectKeywords?.map((keyword) => {
                        return <Category>#{keyword}</Category>;
                      })}
                    </SelectedCategory>
                  )}
                </dd>
              </>
            )}
            {isResult && <RecommendResult />}
          </Essential>
        </EssentialBlock>
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

const SelectedCategory = styled.div`
  width: 100%;
`;

const SurveyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Category = styled.div`
  display: inline-block;
  padding: 9px 20px;
  border-radius: 20px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.color.yellow2};
  & + & {
    margin-left: 5px;
  }
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
  dd {
    margin-bottom: 30px;
  }
  width: 90%;
  padding: 40px;
  @media screen and (max-width: 500px) {
    padding: 20px;
  }
`;

export default recommend;
