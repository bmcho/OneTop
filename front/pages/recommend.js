import styled from 'styled-components';
import Image from 'next/image';
import SearchFromCategory from '../src/components/search/searchCategory/SearchFromCategory';

const recommend = (props) => {
  return (
    <RecommendBlock>
      <TitleBlock>
        <TitleText>
          <h2>나에게 맞는 화장품은?</h2>
          <p>본인에게 맞는 화장품을 추천 받아보세요.</p>
        </TitleText>
        <TitleImage>
          <Image src={'/images/recommend.jpg'} layout="fill" />
        </TitleImage>
      </TitleBlock>
      <SurveyBlock>
        <EssentialBlock>
          <EssentialTitle>
            <span>필수</span>
            필수 입력 항목입니다
          </EssentialTitle>
          <Essential>
            <dt>어떤 화장품을 찾고 계신가요?</dt>
            <dd>
              <SearchFromCategory />
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

const TitleBlock = styled.div`
  position: relative;
  width: 1024px;
  height: 265px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffe7c8;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const TitleText = styled.div`
  h2 {
    color: #fb6d3a;
    font-size: 30px;
    font-weight: 900;
    padding: 20px 0;
  }
  p {
    font-size: 16px;
  }
  width: 60%;
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  letter-spacing: 1.5px;
`;

const TitleImage = styled.div`
  width: 40%;
  height: 100%;
  position: relative;
  right: 0;
`;

const SurveyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EssentialBlock = styled.article``;
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
  }
  padding: 40px;
`;

export default recommend;
