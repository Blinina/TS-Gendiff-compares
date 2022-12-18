import { useDropzone } from 'react-dropzone'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setFile, deleteFile } from '../store/formSlice';


export default function Dropzone({ prop }) {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result;
        const res = String.fromCharCode.apply(null, new Uint8Array(binaryStr));
        dispatch((setFile({ "file": prop, "text": res })));
      }
      reader.readAsArrayBuffer(file);
    })
  }, [])
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop })
  const handleDelete = () => {
    dispatch((deleteFile({ "file": prop })));
    acceptedFiles.splice(0, acceptedFiles.length)
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button>Загрузить файл</Button>
      </div>
      <aside>
        {acceptedFiles.map((el) => <> <p>{el.path}</p><Button onClick={handleDelete}>&#10007;</Button></>)}
      </aside>
    </div>
  )
}