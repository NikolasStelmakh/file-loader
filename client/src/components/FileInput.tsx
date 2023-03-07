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

    const body = new FormData();
    body.append('file', fileToSend);

    fetch(`${process.env.REACT_APP_API_ADDRESS}file`, {
      method: 'POST',
      body: body,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const handleUploadFromURL = () => {
    fetch(`${process.env.REACT_APP_API_ADDRESS}file/external`, {
      method: 'POST',
      body: JSON.stringify({
        fileUrl:
          'https://mercury.bid.cars/1-44641480/1966-Cadillac-Fleetwood-NNNN-1.jpg',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="title">Document Uploader</div>

      <div className="buttons-container">
        <div className="load-button" onClick={handleUploadClick}>
          <div>
            <div className="icon-container">
              <img src={'file-icon.png'} />
            </div>
            <div>{file ? `${file.name}` : 'Upload from File'}</div>
          </div>
        </div>

        <div className="load-button" onClick={handleUploadFromURL}>
          <div>
            <div className="icon-container">
              <img src={'link-icon.png'} />
            </div>
            <div>Upload from URL</div>
          </div>
        </div>
      </div>

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
