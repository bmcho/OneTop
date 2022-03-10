import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SearchFromCategory from './SearchFromCategory';
import SearchResultFromCategory from './SearchResultFromCategory';
import { categories, categories3 } from '../../../utils/categoryUtil';
import { useRouter } from 'next/router';
import Pagenation from './Pagenation';
import { useSelector } from 'react-redux';
import { MdChevronLeft } from 'react-icons/md';

const CategoriesAndResult = () => {
  const router = useRouter();
  const { largeCategory, smallCategory } = router.query;
  const { data } = useSelector((state) => state.searchCategory);

  const [largeCategoryIndex, setLargeCategoryIndex] = useState(1);
  const [smallCategoryIndex, setSmallCategoryIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortingStandard, setSortingStandard] = useState('id desc');

  const itemPerPage = 5;
  const totalPageCount = data?.totalPageCount;

  const selectLargeCategory = (idx) => {
    setLargeCategoryIndex(idx);
    setSmallCategoryIndex(null);
  };

  const selectSmallCategory = (idx) => {
    setSmallCategoryIndex(idx);
  };

  const resetCategory = () => {
    setLargeCategoryIndex(1);
    setSmallCategoryIndex(null);
    router.push({
      pathname: router.pathname,
    });
  };

  useEffect(() => {
    if (largeCategory && smallCategory) {
      const largeIndex = categories3.findIndex(
        (category) => category.large === largeCategory
      );
      const smallIndex = categories3[largeIndex].small.findIndex(
        (category) => category.label === smallCategory
      );
      setLargeCategoryIndex(largeIndex + 1);
      setSmallCategoryIndex(smallIndex + 1);
    } else if (largeCategoryIndex || smallCategoryIndex) {
      resetCategory();
    }
    setLoading(false);
  }, [largeCategory, smallCategory]);

  if (loading) return null;

  return (
    <>
      {largeCategoryIndex && smallCategoryIndex ? (
        <>
          <Wrapper size={itemPerPage}>
            <ResultHeader>
              <button onClick={resetCategory}>
                <MdChevronLeft size={20} />
                뒤로
              </button>
              <div>
                <span className="largeCategory">{largeCategory}</span>·
                <span>{smallCategory}</span>
              </div>
            </ResultHeader>
            <SearchResultFromCategory
              largeCategory={categories3[largeCategoryIndex - 1].large}
              smallCategory={
                categories3[largeCategoryIndex - 1].small[
                  smallCategoryIndex - 1
                ].label
              }
              itemPerPage={itemPerPage}
              sortingStandard={sortingStandard}
            />
          </Wrapper>
          <Pagenation
            pathname={router.pathname}
            totalPage={totalPageCount}
            itemPerPage={itemPerPage}
            kind={{
              largeCategory: categories3[largeCategoryIndex - 1].large,
              smallCategory:
                categories3[largeCategoryIndex - 1].small[
                  smallCategoryIndex - 1
                ].label,
            }}
          />
        </>
      ) : (
        <SearchFromCategory
          largeCategoryIndex={largeCategoryIndex}
          smallCategoryIndex={smallCategoryIndex}
          selectLargeCategory={selectLargeCategory}
          selectSmallCategory={selectSmallCategory}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  ${(props) =>
    props.size &&
    css`
      height: calc(165px * ${parseInt(props.size) + 0.5});
    `};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultHeader = styled.div`
  padding-top: 30px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 25px;
  button {
    display: flex;
    justify-content: center;
    font-size: 15px;
    border-radius: 10px;
    position: absolute;
    left: 0;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default CategoriesAndResult;
