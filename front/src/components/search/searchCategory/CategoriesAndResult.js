import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SearchFromCategory from './SearchFromCategory';
import SearchResultFromCategory from './SearchResultFromCategory';
import { categories, categories3 } from '../../../utils/categoryUtil';
import { useRouter } from 'next/router';
import Pagenation from './Pagenation';
import { useSelector } from 'react-redux';

const CategoriesAndResult = () => {
  const router = useRouter();
  const { largeCategory, smallCategory } = router.query;
  const { data } = useSelector((state) => state.searchCategory);

  const [largeCategoryIndex, setLargeCategoryIndex] = useState(null);
  const [smallCategoryIndex, setSmallCategoryIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemPerPage = 5;
  const [nowPage, setNowPage] = useState(1);
  const totalPageCount = data?.totalPageCount;

  const selectLargeCategory = (idx) => {
    setLargeCategoryIndex(idx);
    setSmallCategoryIndex(null);
  };

  const selectSmallCategory = (idx) => {
    setSmallCategoryIndex(idx);
  };

  const resetCategory = () => {
    setLargeCategoryIndex(null);
    setSmallCategoryIndex(null);
  };

  useEffect(() => {
    const { largeCategory, smallCategory } = router.query;
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
            <SearchResultFromCategory
              largeCategory={categories3[largeCategoryIndex - 1].large}
              smallCategory={
                categories3[largeCategoryIndex - 1].small[
                  smallCategoryIndex - 1
                ].label
              }
              itemPerPage={itemPerPage}
              nowPage={nowPage}
              resetCategory={resetCategory}
              setNowPage={setNowPage}
            />
          </Wrapper>
          <Pagenation
            pathname={router.pathname}
            totalPage={totalPageCount}
            itemPerPage={itemPerPage}
            largeCategory={categories3[largeCategoryIndex - 1].large}
            smallCategory={
              categories3[largeCategoryIndex - 1].small[smallCategoryIndex - 1]
                .label
            }
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
      height: calc(120px * ${parseInt(props.size) + 0.5});
    `};
`;

export default CategoriesAndResult;
