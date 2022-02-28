import { useState } from 'react';
import styled from 'styled-components';
import CompareBoxButton from './ComparBoxButton';
import CompareBox from './CompareBox';

const ProductCompare = () => {
  const [isClicked, setIsClicked] = useState(false);
  const comparBoxOpenHandle = () => {
    setIsClicked((prev) => !prev);
  };
  return (
    <>
      {isClicked ? (
        <CompareBox comparBoxOpenHandle={comparBoxOpenHandle} />
      ) : (
        <CompareBoxButton comparBoxOpenHandle={comparBoxOpenHandle} />
      )}
    </>
  );
};

export default ProductCompare;
