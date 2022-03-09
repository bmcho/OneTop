import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../../utils/categoryUtil';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import {
  getKeywordsAction,
  setSelectedKeywordsAction,
} from '../../stores/modules/productRecommend';

const SelectFromKeyword = ({ category, setIsResult }) => {
  const { loading, data, error } = useSelector(
    (state) => state.productRecommend.keywords
  );
  const dispatch = useDispatch();
  const [selectedKeyword, setSelectedKeyword] = useState(
    new Array(data?.keyword?.length).fill(false)
  );

  const keywordSelectHandle = (index) => {
    setSelectedKeyword((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const getResultHandle = () => {
    dispatch(
      setSelectedKeywordsAction(
        selectedKeyword.reduce((acc, cur, index) => {
          if (cur) return acc.concat(data?.keyword[index]);
          return acc;
        }, [])
      )
    );
    setIsResult(true);
  };

  useEffect(() => {
    dispatch(getKeywordsAction(category));
  }, [category]);

  if (loading) return <div>loading...</div>;
  if (!data) return null;

  return (
    <>
      <KeywordBlock>
        {data &&
          data.keyword.map((keyword, index) => {
            return (
              <Keyword
                onClick={() => keywordSelectHandle(index)}
                active={selectedKeyword[index]}
              >
                #{keyword}
              </Keyword>
            );
          })}
      </KeywordBlock>
      <button onClick={getResultHandle}>완료</button>
    </>
  );
};

const KeywordBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
`;

const Keyword = styled.button`
  font-size: 20px;
  padding: 5px 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  &:hover {
    border-color: ${({ theme }) => theme.color.yellow2};
    color: ${({ theme }) => theme.color.KeywordBlock};
    background-color: ${({ theme }) => theme.color.yellow2};
  }
  ${(props) =>
    props.active &&
    css`
      border-color: ${({ theme }) => theme.color.yellow2};
      color: ${({ theme }) => theme.color.KeywordBlock};
      background-color: ${({ theme }) => theme.color.yellow2};
    `}
`;

export default SelectFromKeyword;
