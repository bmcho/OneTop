import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchIngredient from '../src/components/search/searchIngredient/SearchIngredient';
import SearchKeyword from '../src/components/search/searchKeyword/SearchKeyword';
import SearchTypeTap from '../src/components/search/searchTypeTap/SearchTypeTap';
import CategoriesAndResult from '../src/components/search/searchCategory/CategoriesAndResult';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const search = (props) => {
  const router = useRouter();
  const { tapState } = useSelector((state) => state.searchTypeTap);
  useEffect(() => {
    router.push({
      pathname: '/search',
    });
  }, [tapState]);

  return (
    <SearchPageBlock>
      <NextSeo
        title="검색 | reCco"
        description="reCco의 다양한 검색 유형을 통해 구매 전 내가 찾는 제품이 맞는지 확인해 보세요"
      />
      <SearchTypeTap />
      {tapState === 'category' && <CategoriesAndResult />}
      {tapState === 'keyword' && <SearchKeyword />}
      {tapState === 'ingredient' && <SearchIngredient />}
    </SearchPageBlock>
  );
};

const SearchPageBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

export default search;
