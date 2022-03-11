import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { theme } from '../../../../styles/theme';

const LoadingComponent = () => {
  return (
    <LoadingBlock>
      <ReactLoading type={'spin'} color={theme.color.yellow1} />
    </LoadingBlock>
  );
};

const LoadingBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 200px 0;
`;

export default LoadingComponent;
