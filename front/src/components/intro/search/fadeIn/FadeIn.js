import { useLayoutEffect, useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeIn = ({ children, stagger = 0, x = 0 }) => {
  const el = useRef();
  const animation = useRef();

  useLayoutEffect(() => {
    animation.current = gsap.from(el.current.children, {
      opacity: 0,
      stagger,
      x,
    });
  }, []);

  return <div ref={el}>{children}</div>;
};
export default FadeIn;
