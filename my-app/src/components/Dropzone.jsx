import { useDropzone } from 'react-dropzone';
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFile, deleteFile } from '../store/formSlice';
import { setErrorFile } from '../store/errorSice';

export default function Dropzone({ prop }) {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => {
        dispatch(setErrorFile({ "file": prop, "text": 'File reading was aborted. Choose another file.' }));
      };
      reader.onerror = () => {
        dispatch(setErrorFile({ "file": prop, "text": 'File reading was aborted. Choose another file.' }));
      };
      reader.onload = () => {
        const binaryStr = reader.result;

        const res = String.fromCharCode.apply(null, new Uint8Array(binaryStr));
        dispatch(setFile({ "file": prop, "text": res }));
      }

        reader.readAsArrayBuffer(file);
      })
  }, [])
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });
  const handleDelete = () => {
    acceptedFiles.splice(0, acceptedFiles.length);
    dispatch(setErrorFile({ "file": prop, "text": '' }));
    dispatch((deleteFile({ "file": prop })));
  };

  return (
    <div className='drop-container'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button className='drop-btn' variant="light">Choose File</Button>
      </div>
      <aside>
        {acceptedFiles?.map((el) => <div className='drop-file'>
          <p>{el.path}</p>
          <Button variant="danger" className='danger-btn' onClick={handleDelete}>&#10007;</Button>
        </div>)}
      </aside>
    </div>
  )
}