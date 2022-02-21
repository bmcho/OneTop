export const theme = {
  color: {
    // 숫자가 커질수록 밝은색
    orange1: 'f08c00',
    yellow1: '#F5D672',
    yellow2: '#F8E49A',
    purple: '#4E3F98',
    gray1: '#4d4d4d',
    gray2: '#6f6f6f',
    gray3: '#8b8b8b',
    gray4: '#a5a5a5',
    gray5: '#c4c4c4',
    lightGray1: '#dfdfdf',
    lightGray2: '#f0f1f5',
    lightGray3: '#f6f7fa',
    lightGray4: '#fafbfc',
    white: '#ffffff',
    black: '#000000',
  },
  boxShadow: {
    normal: '0 3px 8px 0 rgb(0 0 0 / 10%)',
    purple: '0 3px 8px 0 #d6c9ff',
    blue: '0 3px 8px 0 #b3e2e6',
  },
};

const customMediaQuery = (maxWidth) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
