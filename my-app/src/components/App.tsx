import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import getDiff from '../helpers/getDiff';
import getCountDifferents from '../helpers/getCountDifferents';
import ResultBefore from './result/ResultBefore';
import ResultAfter from './result/ResultAfter';
import Dropzone from './Dropzone.jsx';
import Plan from './result/Plan';
import { useNavigate,  BrowserRouter, Routes } from 'react-router-dom';

type Inputs = {
  file1: string,
  file2: string,
};

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const [result, setResult] = useState<Array<any> | null>(null);
  const [planFormatte, setPlanFormatte] = useState(false);
  const [countDifferents, setCountDifferents] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [errFile1, setErrFile1] = useState('');
  const [errFile2, setErrFile2] = useState('');

  const DataStore = useSelector((store: any) => store.files);

  const validateFn = (value:string) => {
    let validValue = '';
    try {
      JSON.parse(value);
    } catch (err:any) {
     validValue = err.message.split(',')[1];
    }
    return validValue;
  };
  const onSubmit: SubmitHandler<Inputs> = data => {
    const dataKeys = Object.keys(data) as (keyof typeof data)[];
    dataKeys.forEach((el) => {
      if (data[el] === '' && DataStore[`${el}`]) {
        data[el] = DataStore[`${el}`];
      }
    });
    try {
      const res = getDiff(data);
      setResult(res);
      setCountDifferents(getCountDifferents(res));
      setErrFile1('');
      setErrFile2('');
      // navigate('./ppp');  
    } catch {
      setErrFile1(validateFn(data.file1))
      setErrFile2(validateFn(data.file2))
    }
  };
  const errorFileRead = useSelector((store:any)=>store.errors);

  return (
    // <BrowserRouter>
    //    <Routes>
    <div >
      <div>
        <h2>{`{ JSON Diff }`}</h2>
        <span>Created by Blinina</span>
      </div>

      <div className="app">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-colomn'>
            <Form.Group className="mb-3 textarea card" controlId="file1">
              <Form.Label>First JSON document</Form.Label>
              <Dropzone prop={"file1"} />
              <Form.Control as="textarea"
              className={(errFile1  || errorFileRead.file1) && 'form-invalid'}
                defaultValue={DataStore.file1 && DataStore.file1}
                {...register("file1")}
              />
              {<span className='invalid'>{errFile1 || errorFileRead.file1}</span>}
            </Form.Group>

            <Form.Group className="mb-3 textarea card" controlId="file2">
              <Form.Label>Second JSON document</Form.Label>
              <Dropzone prop={"file2"} />
              <Form.Control as="textarea"
              className={(errFile2  || errorFileRead.file2) && 'form-invalid'}
              defaultValue={DataStore.file2 && DataStore.file2}
                {...register("file2")}
              />
              {<span className='invalid'>{errFile2 || errorFileRead.file2}</span>}
            </Form.Group>
          </div>
          <Button variant="light" className='main-bth' type="submit" onClick={handleSubmit(onSubmit)}>
            Compare
          </Button>
        </Form>
      </div>
      {result &&
        <div className='container' id="result">
          <Button variant="light" className='btn-res' onClick={() => setPlanFormatte(!planFormatte)}>
            {planFormatte ? 'Show JSON' : 'Show PLAN'}
          </Button>
          <div className='countDifferents'>{countDifferents} difference(s) between the two JSON documents</div>
          {planFormatte ?
            <div className='plan-container'>
              <pre className='plan-result'>
                <Plan res={result} acc={''} />
              </pre>
            </div>
            :
            <div className='result-container'>
              <pre className='result-left'>
                <ResultBefore res={result} render={true} />
              </pre>
              <pre className='result-right'>
                <ResultAfter res={result} render={true} />
              </pre>
            </div>}
        </div>}
    </div>
    // </Routes>
    // </BrowserRouter>
  );
}

export default App;

