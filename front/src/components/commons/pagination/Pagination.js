import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
  countByStep,
}) => {
  const pageStep = parseInt(currentPage / countByStep);
  const goTargetPage = (page) => {
    setCurrentPage(page);
  };
  const clickPrevButton = (e) => {
    e.preventDefault();
    setCurrentPage(countByStep * (pageStep - 1) + (countByStep - 1));
  };
  const clickNextButton = (e) => {
    e.preventDefault();
    setCurrentPage(countByStep * (pageStep + 1));
  };
  return (
    <Nav>
      {pageStep !== 0 && (
        <Button onClick={clickPrevButton} disabled={currentPage === 1}>
          이전
        </Button>
      )}
      {Array(
        (pageStep + 1) * countByStep < totalPage
          ? countByStep
          : totalPage - pageStep * countByStep
      )
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => goTargetPage(countByStep * pageStep + i)}
            active={i + countByStep * pageStep === currentPage}
          >
            {countByStep * pageStep + i + 1}
          </Button>
        ))}
      {pageStep + 1 !== Math.ceil(totalPage / countByStep) && (
        <Button onClick={clickNextButton} disabled={currentPage === totalPage}>
          다음
        </Button>
      )}
    </Nav>
  );
};
const Button = styled.button`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 2px;
  border: 1px solid
    ${({ active, theme }) =>
      active ? theme.color.gray1 : theme.color.lightGray1};
  color: ${({ active, theme }) =>
    active ? theme.color.gray1 : theme.color.gray4};

  font-size: 14px;
  line-height: 28px;
  vertical-align: top;
  box-sizing: border-box;
  font-weight: 700;
  &:focus {
    border-color: ${({ theme }) => theme.color.gray1};
    color: ${({ theme }) => theme.color.gray1};
  }
`;
const Nav = styled.nav`
  text-align: center;
  padding: 20px 0;
`;
export default Pagination;
