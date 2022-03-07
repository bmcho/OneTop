import styled from 'styled-components';
import Image from 'next/image';

const RecommendTitle = () => {
  return (
    <TitleBlock>
      <TitleText>
        <h2>나에게 맞는 화장품은?</h2>
        <p>본인에게 맞는 화장품을 추천 받아보세요.</p>
      </TitleText>
      <TitleImage>
        <Image src={'/images/recommend.jpg'} layout="fill" />
      </TitleImage>
    </TitleBlock>
  );
};

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
  @media screen and (max-width: 1080px) {
    width: 90%;
  }
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
  @media screen and (max-width: 1080px) {
    padding-left: 0;
    align-items: center;
  }
  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;

const TitleImage = styled.div`
  width: 40%;
  height: 100%;
  position: relative;
  right: 0;
  @media screen and (max-width: 1080px) {
    width: 40%;
  }
  @media screen and (max-width: 860px) {
    display: none;
  }
`;

export default RecommendTitle;
