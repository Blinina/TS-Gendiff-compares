import { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import getDiff from '../helpers/getDiff';
import getCountDifferents from '../helpers/getCountDifferents';
import ResultBefore from './result/ResultBefore';
import ResultAfter from './result/ResultAfter';
import Dropzone from './Dropzone.jsx';
import Plan from './result/Plan';

type Inputs = {
  file1: string,
  file2: string,
};
type Store = {
  files: {
    file1: string,
    file2: string,
    errors: {
      file1: string,
      file2: string,
    }
  }
}

function App() {
  const btnEl = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<Array<any> | null>(null);
  const [planFormatte, setPlanFormatte] = useState(false);
  const [countDifferents, setCountDifferents] = useState(0);
  const [errFile, setErrFile] = useState({ file1: '', file2: '' });
  const [dropFile1, setDropFile1] = useState(true);
  const [dropFile2, setDropFile2] = useState(true);
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const DataStore = useSelector((store: Store) => store.files);
  const errorFileRead = useSelector((store: Store) => store.files.errors);

  const validateFn = (value: string) => {
    let validValue = '';
    try {
      JSON.parse(value);
    } catch (err) {
      validValue = (err as Error).message.split(',')[1];
    }
    return validValue;
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    try {
      const res = getDiff(data);
      setResult(res);
      setCountDifferents(getCountDifferents(res));
      setErrFile({ file1: '', file2: '' });
      setTimeout(() => {
        btnEl.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }, 300);
    } catch {
      setErrFile({ file1: validateFn(data.file1), file2: validateFn(data.file2) });
    }
  };

  const handleDelete = (chooseFile: string) => {
    chooseFile === 'file1' ? setDropFile1(false) : setDropFile2(false);
  };

  return (
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
              <Dropzone prop={"file1"} dropFile={dropFile1} setDropFile={setDropFile1} setValue={setValue} />
              <Form.Control as="textarea"
                className={(errFile.file1 || errorFileRead.file1) && 'form-invalid'}
                defaultValue={DataStore.file1 && DataStore.file1}
                {...register("file1")}
              />
              {<span className='invalid'>{errFile.file1 || errorFileRead.file1}</span>}
              {DataStore.file1
                &&
                <span className='have-file'>You have added a file. <span className='invalid file-delete' onClick={() => handleDelete('file1')}>Delete it.</span></span>}

            </Form.Group>
            <Form.Group className="mb-3 textarea card" controlId="file2">
              <Form.Label>Second JSON document</Form.Label>
              <Dropzone prop={"file2"} dropFile={dropFile2} setDropFile={setDropFile2} setValue={setValue} />
              <Form.Control as="textarea"
                className={(errFile.file2 || errorFileRead.file2) && 'form-invalid'}
                defaultValue={DataStore.file2 && DataStore.file2}
                {...register("file2")}
              />
              {<span className='invalid'>{errFile.file2 || errorFileRead.file2}</span>}
              {DataStore.file2 && <span className='have-file'>You have added a file. <span className='invalid file-delete' onClick={() => handleDelete('file2')}>Delete it</span></span>}

            </Form.Group>
          </div>
          <Button variant="light" className='main-bth' type="submit" onClick={handleSubmit(onSubmit)}>
            Compare
          </Button>
        </Form>
      </div>
      <div ref={btnEl}>
        {result &&
          <div className='container'>
            <Button variant="light" className='btn-res' onClick={() => setPlanFormatte(!planFormatte)}>
              {planFormatte ? 'Show JSON' : 'Show PLAN'}
            </Button>
            <div className='countDifferents'>{countDifferents} difference(s) between the two JSON documents</div>
            {
              planFormatte
                ?
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
                </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;