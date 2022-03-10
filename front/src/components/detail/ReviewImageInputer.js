import styled from 'styled-components';
import { MdOutlineCancel } from 'react-icons/md';

const ReviewImageInputer = ({ imgFiles, setImgFiles }) => {
  const addFileHandle = (e) => {
    e.preventDefault();
    const { files } = e.target;
    if (imgFiles.length + files.length > 5)
      return alert('이미지는 최대 5개까지 넣을 수 있습니다.');
    Object.values(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImgFiles((prev) => {
          return [
            ...prev,
            { encoingFile: reader.result, name: file.name, fileInfo: file },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const fileDropHandle = (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (imgFiles.length + files.length > 5)
      return alert('이미지는 최대 5개까지 넣을 수 있습니다.');

    Object.values(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImgFiles((prev) => {
          return [
            ...prev,
            { encoingFile: reader.result, name: file.name, fileInfo: file },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFileHandle = (fileInfo) => {
    setImgFiles((prev) => prev.filter((file) => file.fileInfo !== fileInfo));
  };
  const fileDropEventHandle = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('inner'))
      e.target.style.backgroundColor = 'rgba(0,0,0,0.2)';
  };

  const fileDropEndEventHandle = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('inner'))
      e.target.style.backgroundColor = '';
  };
  return (
    <ImageInputWrapper>
      <label className="label" htmlFor="input">
        {/* <div
          className="inner"
          onDrop={fileDropHandle}
          onDragOver={fileDropEventHandle}
          onDragLeave={fileDropEndEventHandle}
          onDragEnter={fileDropEventHandle}
          onMouseLeave={fileDropEndEventHandle}
        >
          드래그하거나 클릭해서 업로드
        </div> */}
      </label>
      <input
        id="input"
        className="input"
        accept="image/*"
        type="file"
        multiple={true}
        hidden={true}
        onChange={addFileHandle}
      />
      {/* <div className="preview">
        {imgFiles.map((imgFile, index) => {
          const { encoingFile, fileInfo, name } = imgFile;
          return (
            <ImageWrapper key={index}>
              <StyledMdOutlineCancel
                onClick={() => removeFileHandle(fileInfo)}
              />
              <img src={encoingFile} />
            </ImageWrapper>
          );
        })}
      </div> */}
    </ImageInputWrapper>
  );
};

const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  height: 320px;
  width: 100%;

  .label {
    width: 100%;
    height: 160px;
    cursor: pointer;
  }

  .inner {
    width: 100%;
    height: 100%;
    line-height: 160px;
    text-align: center;
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .inner:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .preview {
    box-sizing: border-box;
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: ${({ theme }) => theme.color.yellow1};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 120px;
  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
`;

const StyledMdOutlineCancel = styled(MdOutlineCancel)`
  position: absolute;
  top: 0;
  right: 0;
`;

export default ReviewImageInputer;
