import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchFromCategory from './SearchFromCategory';
import SearchResultFromCategory from './SearchResultFromCategory';
import { categories } from '../../../utils/categoryUtil';
import { useRouter } from 'next/router';

const CategoriesAndResult = () => {
  const router = useRouter();
  const categoryArr = Object.entries(categories);
  const [largeCategoryIndex, setLargeCategoryIndex] = useState(null);
  const [smallCategoryIndex, setSmallCategoryIndex] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const largeIndex = Object.keys(categories).indexOf(largeCategory);
      const smallIndex = categoryArr[largeIndex][1].indexOf(smallCategory);
      setLargeCategoryIndex(largeIndex);
      setSmallCategoryIndex(smallIndex);
    } else if (largeCategoryIndex || smallCategoryIndex) {
      setLargeCategoryIndex(null);
      setSmallCategoryIndex(null);
    }
    setLoading(false);
  }, [router.query]);

  if (loading) return null;

  return (
    <>
      {largeCategoryIndex !== null && smallCategoryIndex !== null ? (
        <SearchResultFromCategory
          largeCategory={categoryArr[largeCategoryIndex][0]}
          smallCategory={categoryArr[largeCategoryIndex][1][smallCategoryIndex]}
          resetCategory={resetCategory}
        />
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

export default CategoriesAndResult;
