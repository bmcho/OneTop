import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Pagenation = ({ pathname, itemPerPage, totalPage, kind }) => {
  const router = useRouter();
  const { page } = router.query;
  const [pagenatePage, setPagenagePage] = useState(parseInt(page) || 1);
  const [totalPageCount, setTotalPageCount] = useState(totalPage);

  useEffect(() => {
    if (page) {
      setPagenagePage(parseInt(page));
    }
  }, [page]);

  useEffect(() => {
    if (totalPage) {
      setTotalPageCount(totalPage);
    }
  }, [totalPage]);

  const NextPageHandle = (pathname, pageNum) => {
    setPagenagePage(pageNum);
    router.push({
      pathname: pathname,
      query: {
        ...kind,
        page: pageNum,
      },
    });
  };

  const NextPagenateHandle = (end) => {
    NextPageHandle(pathname, end + 1);
    setPagenagePage(end + 1);
  };

  const PrevPagenateHandle = (start) => {
    NextPageHandle(pathname, start);
    setPagenagePage(start);
  };

  const startPageNum = parseInt((pagenatePage - 1) / itemPerPage) * itemPerPage;
  const endPageNum =
    startPageNum + itemPerPage > totalPageCount + 1
      ? totalPageCount + 1
      : startPageNum + itemPerPage;
  const isNext = endPageNum < totalPageCount + 1;
  const isPrev = startPageNum >= 1;

  if (!totalPageCount) return null;

  return (
    <ButtonWrapper>
      <PageButton
        disabled={!isPrev}
        onClick={() => PrevPagenateHandle(startPageNum)}
      >
        <div>
          <MdKeyboardArrowLeft size={18} />
        </div>
      </PageButton>
      {new Array(endPageNum - startPageNum).fill(0).map((_, idx) => {
        return (
          <PageButton
            key={startPageNum + idx + 1}
            onClick={() => NextPageHandle(pathname, startPageNum + idx + 1)}
            active={startPageNum + idx + 1 === pagenatePage}
          >
            <div>{startPageNum + idx + 1}</div>
          </PageButton>
        );
      })}
      {isNext && (
        <PageButton onClick={() => NextPagenateHandle(endPageNum)}>
          <div>
            <MdKeyboardArrowRight size={18} />
          </div>
        </PageButton>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 14px;
  text-align: center;
  line-height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ active, theme }) =>
      active ? theme.color.gray1 : theme.color.lightGray1};
  color: ${({ active, theme }) =>
    active ? theme.color.gray1 : theme.color.gray4};
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* &:focus {
    border-color: ${({ theme }) => theme.color.gray1};
    color: ${({ theme }) => theme.color.gray1};
  } */

  & + & {
    margin-left: 2px;
  }
`;

export default Pagenation;
