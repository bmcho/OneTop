import React, { useState } from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import { VscSymbolKeyword } from 'react-icons/vsc';
import { FaCarrot } from 'react-icons/fa';
import styled, { css } from 'styled-components';

const Search = (props) => {
  const [tapState, setTapState] = useState(0);

  return (
    <SearchBlock>
      <div>
        <Title>
          다양한 검색으로
          <br /> 상품찾기
        </Title>
        <Text>
          카테고리 키워드 성분 검색으로
          <br /> 원하는 상품을 찾아보세요.
        </Text>
      </div>
      <div>
        <List>
          <Item>
            <Button onClick={() => setTapState(0)} active={tapState === 0}>
              <IconWrap active={tapState === 0}>
                <MdOutlineCategory size={16} />
              </IconWrap>
              {tapState === 0 && <span>카테고리</span>}
            </Button>
          </Item>
          <Item>
            <Button onClick={() => setTapState(1)} active={tapState === 1}>
              <IconWrap active={tapState === 1}>
                <VscSymbolKeyword size={16} />
              </IconWrap>
              {tapState === 1 && <span>카테고리</span>}
            </Button>
          </Item>
          <Item>
            <Button onClick={() => setTapState(2)} active={tapState === 2}>
              <IconWrap active={tapState === 2}>
                <FaCarrot size={16} />
              </IconWrap>
              {tapState === 2 && <span>카테고리</span>}
            </Button>
          </Item>
        </List>
      </div>
      <div>
        {tapState === 0 && <div>category search</div>}
        {tapState === 1 && <div>keyword search</div>}
        {tapState === 2 && <div>ingredient search</div>}
      </div>
    </SearchBlock>
  );
};

const SearchBlock = styled.div`
  width: 100%;
  height: 100vh;
`;
const Title = styled.h2`
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s,line-height 1s,letter-spacing 1s;
  text-align: center;
}`;
const Text = styled.p`
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
  text-align: center;
`;
const List = styled.ul`
  display: flex;
  justify-content: center;
`;
const Item = styled.li`
  padding-right: 10px;
`;
const Button = styled.button`
  display: block;
  width: 50px;
  height: 45px;
  padding: 0 18px;
  border: 1px solid ${(props) => props.theme.color.lightGray1};
  border-radius: 30px;
  line-height: 43px;
  box-sizing: border-box;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.8s ease;
  ${(props) => {
    if (props.active)
      return css`
        position: relative;
        width: auto;
        padding-left: 48px;
        background-color: ${(props) => props.theme.color.yellow1};
        background-position: 7px 50%;
        border-color: ${(props) => props.theme.color.yellow2};
        opacity: 1;
      `;
  }}
`;
const IconWrap = styled.span`
  vertical-align: middle;
  line-height: 24px;
  display: inline-block;
  ${(props) => {
    if (props.active)
      return css`
        position: absolute;
        left: 18px;
        top: 30%;
      `;
  }}
`;
export default Search;
