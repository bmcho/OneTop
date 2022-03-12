import styled from 'styled-components';
import Hashtag from '../../commons/hashtag/Hashtag';
import { MdCameraAlt } from 'react-icons/md';

const ReviewInput = ({
  password,
  comment,
  hashTag,
  hashTags,
  addFileHandle,
  inputChangeHandle,
  hashTagEventHandle,
}) => {
  return (
    <>
      <ReviewWriterInfo>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          autoComplete="off"
          value={password || ''}
          onChange={inputChangeHandle}
        />
        <div className="text-limit">{`${comment.length} / 2000`}</div>
        <AddImageWrapper>
          <label className="label" htmlFor="input-image">
            <StyledMdCameraAlt size={25} />
          </label>
          <input
            id="input-image"
            className="input"
            accept="image/*"
            type="file"
            multiple={true}
            hidden={true}
            onChange={addFileHandle}
          />
        </AddImageWrapper>
      </ReviewWriterInfo>
      <ReviewTextArea
        placeholder="리뷰를 입력해주세요"
        value={comment || ''}
        name="comment"
        onChange={inputChangeHandle}
      />
      <HashTagsBlock>
        {hashTags.length !== 0 &&
          hashTags.map((tag, index) => {
            return <Hashtag key={`${tag}-${index}`}>{tag}</Hashtag>;
          })}
        <input
          type="text"
          placeholder="해시태그"
          name="hashTag"
          value={hashTag || []}
          onChange={inputChangeHandle}
          onKeyPress={hashTagEventHandle}
          onKeyDown={hashTagEventHandle}
        />
      </HashTagsBlock>
    </>
  );
};

const ReviewWriterInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
  .text-limit {
    position: absolute;
    top: 5px;
    right: 40px;
  }
`;
const AddImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledMdCameraAlt = styled(MdCameraAlt)`
  cursor: pointer;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
`;

const HashTagsBlock = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.color.lightGray1};
  padding: 20px;
  margin-top: 5px;
  input[type='text'] {
    border: none;
  }
`;

export default ReviewInput;
