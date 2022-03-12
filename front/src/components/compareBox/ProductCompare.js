import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CompareBoxButton from './CompareBoxButton/ComparBoxButton';
import CompareBox from './CompareBox/CompareBox';

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
