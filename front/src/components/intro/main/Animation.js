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
        <ImageWrap>{/* <img src="/images/main.jpeg" /> */}</ImageWrap>
        <Main>
          <div ref={text1}>
            <MainText>화장품</MainText>
            <MainText>추천해줄께</MainText>
          </div>
        </Main>
        <Sub>
          <SubItem ref={text2}>커몬1</SubItem>
          <SubItem ref={text3}>커몬2</SubItem>
          <SubItem ref={text4}>커몬3</SubItem>
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
  // opacity: ${({ isShown }) => (isShown ? 1 : 0)};
  .text {
    // top: 25vh;
    width: 100%;
    height: 100%;
    position: absolute;
    font-family: Montserrat;
    font-weight: 900;
    font-size: 10rem;
    line-height: 14.6rem;
    white-space: nowrap;
    opacity: 1;
    &__content {
      color: ${({ theme }) => theme.color.yellow1};
      &__border {
        color: transparent;
        -webkit-text-stroke: 0.02em ${({ theme }) => theme.color.yellow1};
      }
    }
    // ${media.mobile} {
    //   white-space: pre-line;
    //   line-height: 10rem;
    // }
  }
  .second {
    position: absolute;
    left: auto;
    right: 0;
    opacity: 0;
    // ${media.mobile} {
    //   font-size: 6rem;
    // }
  }
  .th {
    position: absolute;
    left: auto;
    right: 0;
    opacity: 0;
    top: 50px;
  }
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
