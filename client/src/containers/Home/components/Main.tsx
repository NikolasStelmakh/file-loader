import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import FileInput from '../../../components/FileInput';

export default function Main() {
  return (
    <div className="main-container">
      <div className="actions-container">
        <div className="navigation">
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button>1 | Uploading</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        </div>

        <div className="file-loader">
          <FileInput />
          <div className="info">
            <img src={'info-icon.png'} /> File type: pdf, word, txt (20MB max)
          </div>
        </div>
      </div>

      <div className="random-text-container">
        <div>
          <div className="title">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </div>
          <div className="text">
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney.
          </div>
        </div>
      </div>
    </div>
  );
}
