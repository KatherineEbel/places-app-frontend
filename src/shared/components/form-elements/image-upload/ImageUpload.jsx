import {useRef, useEffect, useState} from "react";
import './ImageUpload.css'

export default function ImageUpload({
                                      center, errorText, id, onInput = () => {
  }
                                    }) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(`https://via.placeholder.com/100?text=${encodeURIComponent('Your Image')}`);
  const [valid, setValid] = useState(false);
  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    const isValid = event.target.files && event.target.files.length === 1;
    setValid(isValid)
    let pickedFile;
    if (isValid) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    console.log(id, pickedFile, isValid)
    onInput(id, pickedFile, isValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }, [file])

  return (
    <div className='form-control'>
      <label className='label'>
        <span className="label-text">Choose an Image</span>
      </label>
      <input id={id} ref={filePickerRef} className='hidden' type='file' accept='.jpg,.png,.jpeg'
             onChange={pickedHandler}
      />
      <div className={`image-upload ${center ? 'center' : ''}`}>
        <div className='image-upload__preview'>
          <img src={previewUrl} alt='Preview'/>
        </div>
        <button className='btn' type='button' onClick={pickImageHandler}>Choose Image</button>
      </div>
      {file && !valid && <p>{errorText}</p>}
    </div>
  )
}