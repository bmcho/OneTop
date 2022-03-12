import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { media } from '../../../../styles/theme';
gsap.registerPlugin(ScrollTrigger);

const Animation = () => {
  const startTrigger = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);

  useEffect(() => {
    const config = {
      scrollTrigger: {
        trigger: startTrigger.current,
        start: 'top top',
        toggleActions: 'play play play play',
        scrub: 1,
      },
      opacity: 0,
      duration: 1,
    };
    const config2 = {
      scrollTrigger: {
        trigger: startTrigger.current,
        start: 'bottom -100%',
        toggleActions: 'play play play play',
        scrub: 1,
      },
      opacity: 1,
      transform: 'translate3d(0px, 0px, 0px)',
      duration: 1,
    };
    const config3 = {
      scrollTrigger: {
        trigger: startTrigger.current,
        start: 'bottom -400%',
        toggleActions: 'play play play play',
        scrub: 1,
      },
      opacity: 0,
      // display: 'block',
      // position: 'static',
      duration: 1,
    };
    gsap.to(text1.current, config);
    gsap.to(text2.current, config2);
    gsap.to(text3.current, {
      ...config2,
      scrollTrigger: { ...config2.scrollTrigger, start: 'bottom -200%' },
    });
    gsap.to(text4.current, {
      ...config2,
      scrollTrigger: { ...config2.scrollTrigger, start: 'bottom -300%' },
    });
    gsap.to(startTrigger.current, config3);
  }, []);

  return (
    <Content>
      <Container ref={startTrigger}>
        <ImageWrap></ImageWrap>
        <Main>
          <div ref={text1}>
            <Image src="/images/logo.png" alt={'로고'} />
            <MainSubText>
              대한민국 유일
              <br /> 화장품 추천 웹
            </MainSubText>
          </div>
        </Main>
        <Sub>
          <SubItem ref={text2}>
            나에게 맞는지 제품인지 구매 전 <br />
            reCco의 비교 추천 서비스 통해 알아보세요
          </SubItem>
          <SubItem ref={text3}>
            reCco의 다양한 검색 유형을 통해 <br />
            구매 전 내가 찾는 제품이 맞는지 확인해 보세요
          </SubItem>
          <SubItem ref={text4}>
            reCco는 누구보다 당신을 위해 고민하며 <br />
            화장품을 찾다 지친 당신을 위해 도와줄 거예요
          </SubItem>
        </Sub>
      </Container>
    </Content>
  );
};
const Content = styled.div`
  position: relative;
  height: 100vh;
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  // z-index: 1;
  top: 0;
  left: 0;
`;
const Main = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
`;
const MainText = styled.div`
  font-weight: 900;
  white-space: nowrap;
  font-size: 85px;
  color: ${({ theme }) => theme.color.yellow1};
  ${media.mobile} {
    font-size: 54px;
  }
`;
const Image = styled.img`
  width: 140px;
  height: 140px;
`;
const MainSubText = styled.div`
  font-size: 24px;
  line-light: 30px;
  letter-spacing: -1.5px;
`;
const Sub = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  transform: translateY(-70%);
`;
const SubItem = styled.div`
  opacity: 0;
  transform: translate3d(0px, -20px, 0px);
  padding: 10px;
  font-size: 24px;
  letter-spacing: -1.5px;
  color: white;
  line-height: 30px;
`;

const ImageWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  /* top: 50%; */
  text-align: center;
  background: url(/images/main.jpeg) center center / cover no-repeat;
`;
export default Animation;
