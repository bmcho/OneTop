import styled, { keyframes } from 'styled-components';
import { colorByLevel } from '../../utils/colorByLevel';
import { theme } from '../../../styles/theme';
import { MdOutlineClose } from 'react-icons/md';
import Modal from './Modal';

const IngredientInfo = ({ ingredients, open, modalOpenHandle }) => {
  return (
    <Modal
      open={open}
      modalOpenHandle={() => modalOpenHandle('ingredient')}
      kind="ingredient"
    >
      <IngredientUl>
        <h5>성분 정보</h5>
        <StyledMdOutlineClose size="24" />
        {ingredients?.map((ingredient) => {
          const maxLevel = Math.max(...ingredient.score.split('-'));
          const backgroundColor = colorByLevel(maxLevel);

          return (
            <IngredientLi key={ingredient.id}>
              <GradeInfo background={theme.color[backgroundColor]}>
                {ingredient.score}
              </GradeInfo>
              <IngredientName>
                <h6>{ingredient.ko_ingredient}</h6>
                <h6>{ingredient.en_ingredient}</h6>
                <h6>{ingredient.use}</h6>
              </IngredientName>
            </IngredientLi>
          );
        })}
      </IngredientUl>
    </Modal>
  );
};

const StyledMdOutlineClose = styled(MdOutlineClose)`
  width: 24px;
  position: absolute;
  top: 20px;
  right: 30px;
  &:hover {
    color: ${theme.color.orange2};
    cursor: pointer;
  }
`;

const IngredientUl = styled.ul`
  position: relative;

  h5 {
    font-size: 24px;
    font-weight: 900;
    padding: 20px 0;
    text-align: center;
  }
  width: 450px;
  height: 450px;
  padding: 0 25px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  background-color: white;
  overflow-y: scroll;
`;

const IngredientLi = styled.li`
  display: flex;
  padding: 5px 0;
  align-items: center;
  & + & {
    border-top: 1.5px solid rgba(0, 0, 0, 0.3);
  }
`;

const IngredientName = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  h6 {
    padding: 3px 0;
    letter-spacing: 1.2px;
  }
`;

const GradeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 25px;
  padding: 4px 5px;
  border-radius: 10px 30px 30px;
  background: ${(props) => props.background};
  color: rgb(255, 255, 255);
  font-size: 16px;
  white-space: nowrap;
  font-weight: 600;
  margin: 5px 10px;
`;

export default IngredientInfo;
