import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import  getDiff from './getDiff';
import ResultCom from './Result';

type Inputs = {
  file1: string,
  file2: string,
};


function App() {
  const [result, setResult] = useState<Array<any> | null>(null)
  // const [result, setResult] = useState('')
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const res = getDiff(data);
    setResult(res)
    // console.log(res.split('/n'))
  }

  return (
    <div >
      <h2>File difference</h2>
      <div className="app">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-colomn'>
            <Form.Group className="mb-3 textarea" controlId="file1">
              <Button variant="outline-primary">Primary</Button>

              <Form.Label>file1</Form.Label>
              <Form.Control as="textarea"
                {...register("file1", { required: true })} />
            </Form.Group>

            <Form.Group className="mb-3 textarea" controlId="file2">
              <Button variant="outline-primary">Primary</Button>
              <Form.Label>file2</Form.Label>
              <Form.Control as="textarea"
                {...register("file2", { required: true })} />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
            Difference
          </Button>
        </Form>
      </div>
      <div>
        <pre>
        {/* {result} */}
        </pre>
        <ResultCom res={result}/>
      </div>
    </div>
  );
}

export default App;
