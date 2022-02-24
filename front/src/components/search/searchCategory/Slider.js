import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Slider = ({ children }) => {
  const SLIDER_LENGTH = children.length;

  const [currentSlide, setCurrentSlide] = useState(10);
  const [duration, setDuration] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const ref = useRef();

  useEffect(() => {
    ref.current.style.transition = `all ${duration}ms ease-in-out`;
    ref.current.style.transform = `translateX(-${currentSlide * 130}px)`;
    setDuration(500);
  }, [currentSlide]);

  const next = () => {
    if (isMoving) return;
    setIsMoving(true);
    setCurrentSlide((cur) => cur + 3);
  };

  const prev = () => {
    if (isMoving) return;
    setIsMoving(true);
    setCurrentSlide((cur) => cur - 3);
  };

  const roof = () => {
    if (!isMoving) return;

    if (currentSlide + 3 >= SLIDER_LENGTH + 10) {
      setDuration(0);
      setCurrentSlide((cur) => cur - SLIDER_LENGTH);
    } else if (currentSlide - 3 < 10) {
      setDuration(0);
      setCurrentSlide((cur) => cur + SLIDER_LENGTH);
    }
    setIsMoving(false);
  };

  return (
    <Wrapper>
      <Btn onClick={prev}>
        <MdChevronLeft />
      </Btn>
      <Container>
        <SliderContainer size={SLIDER_LENGTH} ref={ref} onTransitionEnd={roof}>
          {children &&
            [
              ...children.slice(SLIDER_LENGTH - 10, SLIDER_LENGTH),
              ...children,
              ...children.slice(0, 12),
            ].map((element, index) => {
              return <Slide key={index}>{element}</Slide>;
            })}
        </SliderContainer>
      </Container>
      <Btn onClick={next}>
        <MdChevronRight />
      </Btn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: calc(130px * 8);
  height: 200px;
  display: flex;
  align-items: center;
  overflow-x: scroll;

  @media screen and (max-width: 1200px) {
    width: calc(130px * 6);
  }
  @media screen and (max-width: 900px) {
    width: calc(130px * 4);
  }
  @media screen and (max-width: 600px) {
    width: calc(130px * 3);
  }
`;

const SliderContainer = styled.div`
  ${(props) => {
    return (
      props.size &&
      css`
        width: ${130 * props.size}px;
      `
    );
  }}
  height: 100%;
  display: flex;
`;

const Slide = styled.div`
  box-sizing: border-box;
  width: 130px;
  height: 200px;
  padding: 0 15px;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 60px;
  border: 1px solid rgba(255, 255, 255);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export default Slider;
