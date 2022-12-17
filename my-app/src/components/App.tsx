import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import getDiff from '../helpers';
import ResultBefore from './ResultBefore';
import ResultAfter from './ResultAfter';
import Dropzone from './Dropzone.jsx';

type Inputs = {
  file1: string,
  file2: string,
};

function App() {
  const [result, setResult] = useState<Array<any> | null>(null);

  const { register, handleSubmit } = useForm<Inputs>();
  const DataStore = useSelector((store :any)=>store.files)

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    const res = getDiff(data);
    setResult(res);
  }

  return (
    <div >
      <h2>File difference</h2>
     
      <div className="app">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-colomn'>
            <Form.Group className="mb-3 textarea" controlId="file1">
              <Dropzone prop={"file1"}/>

              <Form.Label>{DataStore.file1 ? 'файл загружен' : "файл"}</Form.Label>
              <Form.Control as="textarea"
                value={DataStore.file1 && DataStore.file1}
                {...register("file1")} />
            </Form.Group>

            <Form.Group className="mb-3 textarea" controlId="file2">
              <Dropzone  prop={"file2"}/>
              <Form.Label>{DataStore.file2 ? 'файл загружен' : "файл"}</Form.Label>
              <Form.Control as="textarea"
             defaultValue={DataStore.file2 && DataStore.file2}
                {...register("file2")} />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
            Difference
          </Button>
        </Form>
      </div>
      <div className='result-container'>
        <pre className='result-left'>
          <ResultBefore res={result} render={true} />
        </pre>
        <pre className='result-right'>
          <ResultAfter res={result} render={true} />
        </pre>
      </div>
    </div>
  );
}

export default App;

