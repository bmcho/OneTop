import styled from 'styled-components';

const RecommendTitle = () => {
  return <TitleBlock></TitleBlock>;
};

const TitleBlock = styled.div`
  position: relative;
  width: 1024px;
  height: 30vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -1.5px;
  // background-color: ${(props) => props.theme.color.yellow2};
  background: url(/images/banner.png) center center / cover no-repeat;
  overflow: hidden;
  margin-bottom: 30px;
  @media screen and (max-width: 1080px) {
    width: 90%;
  }
`;

export default RecommendTitle;
