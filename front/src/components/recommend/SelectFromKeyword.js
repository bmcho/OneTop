import { useDispatch } from 'react-redux';
import { categories } from '../../utils/categoryUtil';
import styled from 'styled-components';

const SelectFromKeyword = ({ largeCategoryIndex, resetCategory }) => {
  const selectedCategory = Object.keys(categories)[largeCategoryIndex];
  const dispatch = useDispatch();
  return (
    <div>
      {selectedCategory}
      <button onClick={resetCategory}>다시 선택</button>
    </div>
  );
};

export default SelectFromKeyword;
