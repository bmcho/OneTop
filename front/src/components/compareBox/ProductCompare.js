import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
