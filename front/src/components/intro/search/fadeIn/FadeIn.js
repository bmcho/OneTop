import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';

const FadeIn = ({ children, stagger = 0, x = 0 }) => {
  const el = useRef();
  const animation = useRef();

  useLayoutEffect(() => {
    if (window.innerWidth > 576) {
      animation.current = gsap.from(el.current.children, {
        opacity: 0,
        stagger,
        x,
      });
    }
  }, []);

  return <div ref={el}>{children}</div>;
};
export default FadeIn;
