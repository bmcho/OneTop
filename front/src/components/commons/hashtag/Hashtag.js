import React from 'react';
import styled from 'styled-components';

const Hashtag = ({ children }) => <Tag>{children}</Tag>;

const Tag = styled.p`
  margin: 0 20px 4px 0;
  padding: 0 10px 0 12px;
  font-size: 12px;
  background: ${(props) => props.theme.color.yellow2};
  color: ${(props) => props.theme.color.gray3};
  text-decoration: none;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  -moz-border-radius-bottomright: 4px;
  -webkit-border-bottom-right-radius: 4px;
  -moz-border-radius-topright: 4px;
  -webkit-border-top-right-radius: 4px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -12px;
    width: 0;
    height: 0;
    border-color: transparent ${(props) => props.theme.color.yellow2}
      transparent transparent;
    border-style: solid;
    border-width: 12px 12px 12px 0;
  }
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    float: left;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: #fff;
    box-shadow: -1px -1px 2px ${(props) => props.theme.color.gray5};
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-box-shadow: -1px -1px 2px ${(props) => props.theme.color.gray5};
    -webkit-box-shadow: -1px -1px 2px ${(props) => props.theme.color.gray5};
  }
`;
export default Hashtag;
