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
  font-size: 18px;
  text-align: center;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    padding: 15px;
    border-radius: 50%;
    ${(props) =>
      props.active &&
      css`
        background-color: ${({ theme }) => theme.color.yellow2};
      `}
  }
  &:hover {
    ${(props) =>
      !props?.disabled &&
      css`
        div {
          background-color: ${({ theme }) => theme.color.yellow2};
        }
      `}
  }
  & + & {
    margin-left: 5px;
  }
`;

export default Pagenation;
