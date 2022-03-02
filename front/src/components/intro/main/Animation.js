import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
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
        start: 'bottom -200%',
        toggleActions: 'play play play play',
        scrub: 1,
      },
      opacity: 1,
      transform: 'translate3d(0px, 0px, 0px)',
      duration: 1,
    };
    const config4 = {
      scrollTrigger: {
        trigger: startTrigger.current,
        start: 'bottom -300%',
        toggleActions: 'play play play play',
        scrub: 1,
      },
      opacity: 1,
      transform: 'translate3d(0px, 0px, 0px)',
      duration: 1,
    };
    const config5 = {
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
    gsap.to(text3.current, config3);
    gsap.to(text4.current, config4);
    gsap.to(startTrigger.current, config5);
  }, []);

  return (
    <Content>
      <Container ref={startTrigger}>
        <div>
          <img src="" />
        </div>
        <Main>
          <div ref={text1}>
            <div>화장품</div>
            <div>추천해줄께</div>
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
const Circle = styled.div`
  position: relative;
  width: 35rem;
  height: 35rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.white};
`;

export default Animation;

// import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// const Main = (props) => {
//   const oneRef = useRef();
//   const titleRef = useRef();
//   const [height, setHeight] = useState(0);
//   const [show, doShow] = useState({
//     itemOne: false,
//     itemTwo: false,
//     part: true,
//   });
//   const [percentShown, setPercentShow] = useState({
//     itemOne: 0,
//     itemTwo: 0,
//     itemThree: 0,
//   });
//   useEffect(() => {
//     console.log(window.innerHeight);
//     setHeight(window.innerHeight * 5);
//   }, []);
//   useEffect(() => {
//     console.log(show.itemOne);
//   }, [show]);
//   useLayoutEffect(() => {
//     const topPos = (element) => element.getBoundingClientRect().top;
//     const bottomPos = (element) => element.getBoundingClientRect().bottom;
//     const titleTop = topPos(titleRef.current);
//     const div1Bottom = bottomPos(oneRef.current);
//     const onScroll = () => {
//       const scrollPos = window.scrollY + window.innerHeight;
//       // console.log(scrollPos, 'scrollPos');
//       // console.log(titleTop, 'titleTop');
//       console.log(window.scrollY, 'scrollY');
//       console.log(window.innerHeight * 4, '4time');
//       if (window.scrollY > window.innerHeight / 2) {
//         // console.log('meet');
//         // console.log(oneRef.current.offsetHeight);
//         doShow((state) => ({ ...state, itemOne: true }));
//       }
//       if (window.scrollY > window.innerHeight) {
//         console.log('meet');
//         doShow((state) => ({ ...state, itemOne: false }));
//       }

//       if (window.scrollY > window.innerHeight * 4) {
//         doShow((state) => ({ ...state, part: false }));
//       } else {
//         doShow((state) => ({ ...state, part: true }));
//       }
//     };
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, [oneRef]);
//   return (
//     <div ref={oneRef} style={{ height: height }}>
//       <ContentWrap>
//         <FixedWrap position={show.part}>
//           <ImageWrap>
//             <Image></Image>
//           </ImageWrap>
//           <Title ref={titleRef} animate={show.itemOne}>
//             <div>내가 찾는</div>
//             <div>모든 뷰티</div>
//           </Title>
//           <SubText>
//             <p>
//               누구보다 나를 가장 잘 아는 사람은 바로 나<br />
//               그래서 나의 선택이 가장 중요해요.
//             </p>
//             <p>
//               누구보다 나를 가장 잘 아는 사람은 바로 나<br />
//               그래서 나의 선택이 가장 중요해요.
//             </p>
//             <p>
//               누구보다 나를 가장 잘 아는 사람은 바로 나<br />
//               그래서 나의 선택이 가장 중요해요.
//             </p>
//           </SubText>
//         </FixedWrap>
//       </ContentWrap>
//     </div>
//   );
// };

// const ContentWrap = styled.div`
//   position: relative;
//   height: 100vh;
//   width: 100%;
// `;
// const FixedWrap = styled.div`
//   position: ${(props) => (props.position ? 'fixed' : 'block')};
//   height: 100%;
//   width: 100%;
// `;
// const ImageWrap = styled.div`
//   width: 100%;
//   height: 100%;
// `;
// const Image = styled.div`
//   width: 100%;
//   height: 100%;
//   background: url(https://photo.jtbc.joins.com/news/2019/09/27/20190927090211325.jpg)
//     center center / cover no-repeat;
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   bottom: 0px;
// `;
// const Title = styled.div`
//   position: absolute;
//   width: 100%;
//   // height: 100%;
//   top: 50%;
//   text-align: center;
//   transform: translateY(-50%);
//   opacity: ${(props) => (props.animate ? 1 : 0)};
//   translateY(${({ percentShown }) => `${percentShown}px`});
// `;
// const SubText = styled.div`
//   position: absolute;
//   width: 100%;
//   top: 50%;
//   text-align: center;
//   transform: translateY(-70%);
// `;
// export default Main;
