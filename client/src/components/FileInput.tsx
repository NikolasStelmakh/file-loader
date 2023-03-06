import { ChangeEvent, useRef, useState } from 'react';

export const MAX_FILE_SIZE = 20 * 1000 * 1000;
export default function FileInput() {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const fileToSend = e.target.files[0];

    console.log(fileToSend);

    if (fileToSend.size > MAX_FILE_SIZE) {
      alert('Too big!');
      return;
    }

    setFile(fileToSend);

    fetch(`${process.env.REACT_APP_API_ADDRESS}file`, {
      method: 'POST',
      body: fileToSend,
      headers: {
        'content-type': fileToSend.type,
        'content-length': `${fileToSend.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="title">Document Uploader</div>

      <button onClick={handleUploadClick}>
        {file ? `${file.name}` : 'Upload from File'}
      </button>

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.word,.txt"
      />
    </div>
  );
}
