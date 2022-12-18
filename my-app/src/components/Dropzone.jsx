import { useDropzone } from 'react-dropzone'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setFile1, setFile2 } from '../store/formSlice';


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
        if (prop === 'file1') {
          dispatch((setFile1(res)));
        } else if (prop === 'file2') {
          dispatch((setFile2(res)));
        }
   
      }
      reader.readAsArrayBuffer(file);
    })

  }, [])
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button>Загрузить файл</Button>
      <aside>
        {acceptedFiles.map((el)=><p>{el.path}</p>)}
      </aside>
    </div>
  )
}