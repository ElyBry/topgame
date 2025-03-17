import { useState, useRef, useId } from "react";
import styled from 'styled-components'

type AttachFileProps = {
  className?: string;
  onChange?: (file: File | null) => void;
};

const AttachFile: React.FC<AttachFileProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (onChange) {
      onChange(selectedFile);
    }
  };

  return (
    <AttachFileStyle>
      <input
        type="file"
        id={inputId}
        name="avatar"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />

      <LabelStyle htmlFor={inputId}>
        {file ? "Выберите другой файл" : "Выберите файл"}
      </LabelStyle>

      {file && <AttachFileNameStyle>Вы выбрали: {file.name}</AttachFileNameStyle>}
    </AttachFileStyle>
  );
};

const AttachFileStyle = styled.div`
    text-align: center;
    max-width: 200px;
    height: 45px;
    margin: 0 auto;
    line-height: 1.6rem;
`;

const LabelStyle = styled.label`
    color: var(--link-color);
    display: inline-block;
    cursor: pointer;
`;

const AttachFileNameStyle = styled.div`
    color: var(--attach-file-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0 0;
`;

export default AttachFile;
