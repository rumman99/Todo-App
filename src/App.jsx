import './App.css'
import { Button, Col, Input, Row} from 'antd';
import { useState } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";



function App() {
  const [isCompleted, setIsCompleted]= useState('false')

  return (
    <>
     <h1 className='text-center mt-10 text-4xl mb-5 text-blue-700'>TODO APP</h1>
    <div className='flex justify-center text-center font-semibold text-green-600'>
     
      <div className=''>
        <div className='flex gap-2'>
        <div className='input-field'>
          <label>Title</label>
          <Input placeholder="Add Task Title"/>
        </div>
        <div className='input-field'>
        <label>Description</label>
          <Input placeholder="Add Description" />
        </div>
          <div className='input-field pt-6'>
          <Button danger>Submit</Button>
        </div>
        </div>
      </div>
    </div>

    <div className='btn-style flex justify-center mt-10 gap-2'>
    <Button onClick={()=>setIsCompleted('false')} className={`${isCompleted==="false" && "active"}`} type="default">All</Button>
    <Button onClick={()=>setIsCompleted('true')} className={`${isCompleted==="true" && "active"}` }type="default">Completed</Button>
    </div>
  
    <div className='mt-20 text-center'>
    <Row className='flex justify-center'>
    {new Array(6).fill(0).map((_, index) => {
      const key = `col-${index}`;
      return (
        <Col
          key={key}
          xs={{
            flex: '100%',
          }}
          sm={{
            flex: '50%',
          }}
          md={{
            flex: '40%',
          }}
          lg={{
            flex: '20%',
          }}
          xl={{
            flex: '10%',
          }}
        >
          <div className='border rounded-lg border-cyan-400 flex justify-center gap-3 mt-3 mr-2 ml-2 w-52 p-6'>
          <div>
            <h1>Task 1</h1>
            <p>Description 1</p>
          </div>
          <div className='icon-style text-2xl hover:cursor-pointer flex gap-2'>
            <RiDeleteBin5Fill/>
            <TiTickOutline />
          </div>
          </div>
        </Col>
      );
    })}
    </Row>
    </div>

    </>
  )
}

export default App
