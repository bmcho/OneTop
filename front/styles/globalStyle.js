import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { media } from './theme';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    html{
        font-size: 16px;
        -webkit-text-size-adjust: none;
        font-family:  Montserrat,-apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
        font-display: fallback;
        ${media.tablet}{
            font-size: 14px;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }
    ul, ol, li {
        list-style: none;
    }

`;
