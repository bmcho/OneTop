import React from 'react';
import styled from 'styled-components';

const Compare = (props) => {
  return (
    <SearchBlock>
      <div>
        <Title>꼼꼼하게 비교해보기</Title>
        <Text>
          다양한 상품을 비교해보며
          <br /> 나에게 잘 맞는 상품을 골라보세요.
        </Text>
      </div>
      <SliderBlock>
        <Window>
          <ImageWrap>
            <ImageBlock>
              <Image></Image>
            </ImageBlock>
            <ImageBlock>
              <Image></Image>
            </ImageBlock>
            <ImageBlock>
              <Image></Image>
            </ImageBlock>
          </ImageWrap>
        </Window>
      </SliderBlock>
    </SearchBlock>
  );
};
const SearchBlock = styled.div`
  width: 100%;
  padding-top: 100px;
  margin-bottom: 100px;
  background-color: ${(props) => props.theme.color.yellow2};
`;
const Title = styled.h2`
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s,line-height 1s,letter-spacing 1s;
  text-align: center;
}`;
const Text = styled.p`
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
  text-align: center;
`;
const SliderBlock = styled.div`
  width: 100%;
  padding-top: 50px;
`;
const Window = styled.div`
  width: 360px;
  height: 500px;
  margin: 0 auto;
  overflow: hidden;
`;
const ImageWrap = styled.div`
  width: 1080px;
  height: 100%;
  animation: slide 6s infinite;
  @keyframes slide {
    0% {
      margin-left: 0;
    } /* 0 ~ 10  : 정지 */
    15% {
      margin-left: 0;
    }
    33% {
      margin-left: -100%;
    }
    50% {
      margin-left: -100%;
    }
    66% {
      margin-left: -200%;
    }
    85% {
      margin-left: -200%;
    }
    100% {
      margin-left: 0%;
    }
  }
`;
const ImageBlock = styled.span`
  width: 360px;
  height: 100%;
  display: inline-flex;
`;
const Image = styled.div`
  background-image: url(/images/compare.jpeg);
  width: 100%;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  border-radius: 0;
  box-shadow: none;
`;
export default Compare;
