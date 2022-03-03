import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Main = (props) => {
  const oneRef = useRef();
  const titleRef = useRef();
  const [height, setHeight] = useState(0);
  const [show, doShow] = useState({
    itemOne: false,
    itemTwo: false,
    part: true,
  });
  const [percentShown, setPercentShow] = useState({
    itemOne: 0,
    itemTwo: 0,
    itemThree: 0,
  });
  useEffect(() => {
    console.log(window.innerHeight);
    setHeight(window.innerHeight * 5);
  }, []);
  useEffect(() => {
    console.log(show.itemOne);
  }, [show]);
  useLayoutEffect(() => {
    const topPos = (element) => element.getBoundingClientRect().top;
    const bottomPos = (element) => element.getBoundingClientRect().bottom;
    const titleTop = topPos(titleRef.current);
    const div1Bottom = bottomPos(oneRef.current);
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      // console.log(scrollPos, 'scrollPos');
      // console.log(titleTop, 'titleTop');
      console.log(window.scrollY, 'scrollY');
      console.log(window.innerHeight * 4, '4time');
      if (window.scrollY > window.innerHeight / 2) {
        // console.log('meet');
        // console.log(oneRef.current.offsetHeight);
        doShow((state) => ({ ...state, itemOne: true }));
      }
      if (window.scrollY > window.innerHeight) {
        console.log('meet');
        doShow((state) => ({ ...state, itemOne: false }));
      }

      if (window.scrollY > window.innerHeight * 4) {
        doShow((state) => ({ ...state, part: false }));
      } else {
        doShow((state) => ({ ...state, part: true }));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [oneRef]);
  return (
    <div ref={oneRef} style={{ height: height }}>
      <ContentWrap>
        <FixedWrap position={show.part}>
          <ImageWrap>
            <Image></Image>
          </ImageWrap>
          <Title ref={titleRef} animate={show.itemOne}>
            <div>내가 찾는</div>
            <div>모든 뷰티</div>
          </Title>
          <SubText>
            <p>
              누구보다 나를 가장 잘 아는 사람은 바로 나<br />
              그래서 나의 선택이 가장 중요해요.
            </p>
            <p>
              누구보다 나를 가장 잘 아는 사람은 바로 나<br />
              그래서 나의 선택이 가장 중요해요.
            </p>
            <p>
              누구보다 나를 가장 잘 아는 사람은 바로 나<br />
              그래서 나의 선택이 가장 중요해요.
            </p>
          </SubText>
        </FixedWrap>
      </ContentWrap>
    </div>
  );
};

const ContentWrap = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;
const FixedWrap = styled.div`
  position: ${(props) => (props.position ? 'fixed' : 'block')};
  height: 100%;
  width: 100%;
`;
const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
`;
const Image = styled.div`
  width: 100%;
  height: 100%;
  background: url(https://photo.jtbc.joins.com/news/2019/09/27/20190927090211325.jpg)
    center center / cover no-repeat;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
`;
const Title = styled.div`
  position: absolute;
  width: 100%;
  // height: 100%;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
  opacity: ${(props) => (props.animate ? 1 : 0)};
  translateY(${({ percentShown }) => `${percentShown}px`});
`;
const SubText = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  transform: translateY(-70%);
`;
export default Main;
