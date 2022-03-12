import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import {
  getKeywordsAction,
  setSelectedKeywordsAction,
} from '../../stores/modules/productRecommend';
import LoadingComponent from '../commons/loading/LoadingComponent';

const SelectFromKeyword = (props) => {
  const { category, keywords } = useSelector((state) => state.productRecommend);
  const dispatch = useDispatch();
  const [selectedKeyword, setSelectedKeyword] = useState(
    new Array(keywords?.data?.keyword?.length).fill(false)
  );
  useEffect(() => {
    dispatch(getKeywordsAction(category));
  }, [category]);

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
          if (cur) return acc.concat(keywords.data?.keyword[index]);
          return acc;
        }, [])
      )
    );
  };

  if (keywords?.loading) return <LoadingComponent />;
  if (!keywords?.data) return null;

  return (
    <SelectFromKeywordBlock>
      <Question>선호하는 타입을 선택해주세요!</Question>
      <Button onClick={getResultHandle}>완료</Button>
      <KeywordBlock>
        {keywords?.data &&
          keywords.data.keyword.map((keyword, index) => {
            return (
              <Keyword
                onClick={() => keywordSelectHandle(index)}
                active={selectedKeyword[index]}
                key={keyword}
              >
                #{keyword}
              </Keyword>
            );
          })}
      </KeywordBlock>
    </SelectFromKeywordBlock>
  );
};
const SelectFromKeywordBlock = styled.div`
  text-align: center;
`;
const KeywordBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 20px;
`;
const Question = styled.div`
  padding: 20px;
  text-align: center;
`;
const Keyword = styled.button`
  width: 100px;
  height: 100px;
  // border-radius: 100%;
  // font-size: 20px;

  border: 1px solid rgba(0, 0, 0, 0.3);

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
const Button = styled.button`
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.black};
  padding: 10px 20px;
  border-radius: 2px;
  border: 2px solid ${(props) => props.theme.color.black};
  &:hover {
    border: 2px solid ${(props) => props.theme.color.purple};
    background-color: ${(props) => props.theme.color.purple};
    color: ${(props) => props.theme.color.white};
  }
`;
export default SelectFromKeyword;
