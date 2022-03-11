import styled from 'styled-components';
import SelectFromCategory from '../src/components/recommend/SelectFromCategory';
import RecommendTitle from '../src/components/recommend/RecommendTitle';
import SelectFromKeyword from '../src/components/recommend/SelectFromKeyword';
import { useSelector, useDispatch } from 'react-redux';
import RecommendResult from '../src/components/recommend/RecommendResult';
import Hashtag from '../src/components/commons/hashtag/Hashtag';
import { recommendedResetAction } from '../src/stores/modules/productRecommend';
import { NextSeo } from 'next-seo';

const recommend = (props) => {
  const dispatch = useDispatch();
  const { category, selectKeywords, keywords, recommended } = useSelector(
    (state) => state.productRecommend
  );
  const reSelect = () => {
    dispatch(recommendedResetAction());
  };
  return (
    <RecommendBlock>
      <NextSeo
        title="추천 | reCco"
        description="본인에게 맞는 화장품을 추천 받아보세요."
      />
      <RecommendTitle />
      {recommended.data && <Button onClick={reSelect}>다시 추천받기</Button>}
      <SurveyBlock>
        {category.length !== 0 && selectKeywords.length === 0 && (
          <div>
            <Selected>카테고리</Selected>
            <Hashtag>{category}</Hashtag>
          </div>
        )}
        {selectKeywords.length !== 0 && (
          <SelectedCategory>
            <Hashtag>{category}</Hashtag>
            {selectKeywords.map((keyword, index) => (
              <Hashtag key={index}>#{keyword}</Hashtag>
            ))}
          </SelectedCategory>
        )}

        {category.length === 0 && selectKeywords.length === 0 && (
          <div>
            <Question>어떤 화장품을 찾고 계신가요?</Question>
            <SelectFromCategory />
          </div>
        )}
        {category.length !== 0 && selectKeywords.length === 0 && (
          <SelectFromKeyword />
        )}
        {selectKeywords.length !== 0 && <RecommendResult />}
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
  display: flex;
  padding: 20px;
  align-self: self-start;
  width: 100%;
  box-sizing: border-box;
`;
const Selected = styled.span`
  padding: 0 20px 20px 20px;
  line-height: 24px;
`;
const SurveyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Question = styled.div`
  padding: 20px;
  text-align: center;
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.black};
  padding: 10px 20px;
  border-radius: 2px;
  border: 2px solid ${(props) => props.theme.color.black};
  &:hover {
    border: 2px solid ${(props) => props.theme.color.purple};
    background-color: ${(props) => props.theme.color.purple};
    color: ${(props) => props.theme.color.white};
  }
`;

export default recommend;
