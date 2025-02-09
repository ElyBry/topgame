import styles from "./AttachFile.module.css";
import { useState, useRef } from "react";

type AttachFileProps = {
  className?: string;
  onChange?: (file: File | null) => void;
};

const AttachFile: React.FC<AttachFileProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (onChange) {
      onChange(selectedFile);
    }
  };

  return (
    <div className={styles.attach_file}>
      <input
        type="file"
        id="choose-file__upload"
        name="avatar"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />

      <label htmlFor="choose-file__upload" className={styles.attach_file_link}>
        {file ? "Выберите другой файл" : "Выберите файл"}
      </label>

      {file && <div className={styles.attach_file_name}>Вы выбрали: {file.name}</div>}
    </div>
  );
};

export default AttachFile;
