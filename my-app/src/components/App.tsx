import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import getDiff, { getCountDifferents } from '../helpers';
import ResultBefore from './ResultBefore';
import ResultAfter from './ResultAfter';
import Dropzone from './Dropzone.jsx';
import Plan from './Plan';

type Inputs = {
  file1: string,
  file2: string,
};

function App() {
  const [result, setResult] = useState<Array<any> | null>(null);
  const [planFormatte, setPlanFormatte] = useState(false);
  const [countDifferents, setCountDifferents] = useState(0);
  const { register, handleSubmit } = useForm<Inputs>();

  const DataStore = useSelector((store: any) => store.files);

  const onSubmit: SubmitHandler<Inputs> = data => {
    const dataKeys = Object.keys(data) as (keyof typeof data)[];
    dataKeys.forEach((el) => {
      if (data[el] === '' && DataStore[`${el}`]) {
        data[el] = DataStore[`${el}`];
      }
    })
    const res = getDiff(data);
    setResult(res);
    setCountDifferents(getCountDifferents(res));
  };

  return (
    <div >
      <div>
        <h2>JSON Diff</h2>
        <span>Created by Blinina </span>
      </div>
      
      <div className="app">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-colomn'>
            <Form.Group className="mb-3 textarea" controlId="file1">
              <Form.Label>{"Добавьте первый JSON файл"}</Form.Label>
              <Dropzone prop={"file1"} />
              <Form.Control as="textarea"
                defaultValue={DataStore.file1 && DataStore.file1}
                {...register("file1")} />
            </Form.Group>
            <Form.Group className="mb-3 textarea" controlId="file2">
              <Form.Label>{"Добавьте второй JSON файл"}</Form.Label>
              <Dropzone prop={"file2"} />
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
      {result && <>
        <Button onClick={() => setPlanFormatte(!planFormatte)}>{planFormatte ? 'Show JSON' : 'Show PLAN'}</Button>
        <div>{countDifferents} difference(s) between the two JSON documents</div>
        {planFormatte ?
          <pre className='plan-container'>
            <div className='plan-div-container'>
              <Plan res={result} acc={''} />
            </div>
          </pre>
          :
          <div className='result-container'>
            <pre className='result-left'>
              <ResultBefore res={result} render={true} />
            </pre>
            <pre className='result-right'>
              <ResultAfter res={result} render={true} />
            </pre>
          </div>}
      </>}
    </div>
  );
}

export default App;

