import Modal from './Modal';
import styled from 'styled-components';

const DescriptionInfo = ({ name, open, description, modalOpenHandle }) => {
  return (
    <Modal open={open} modalOpenHandle={modalOpenHandle} kind="description">
      <Description>
        <h5>{name}</h5>
        {description}
      </Description>
    </Modal>
  );
};

const Description = styled.div`
  position: relative;

  h5 {
    font-size: 24px;
    font-weight: 900;
    padding-bottom: 20px;
    text-align: center;
  }
  width: 450px;
  padding: 25px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow-y: scroll;
`;
export default DescriptionInfo;
