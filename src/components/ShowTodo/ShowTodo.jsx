import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import InputTodo from '../InputTodo/InputTodo';

const ShowTodo = () => {
    const [isCompleted, setIsCompleted]= useState('false');
    const [allTodo, setAllTodo]= useState([]);
    const [todoTitle, setTodoTitle]= useState('');
    const [todoDescription, setTodoDescription]= useState('');

//// Submit Button ////
    const handleSubmitButton=()=>{
        const newTodo={title:todoTitle, description:todoDescription};
        const updatedTodo=[...allTodo, newTodo];
        setAllTodo(updatedTodo);
        localStorage.setItem('todo', JSON.stringify(updatedTodo));
    }

    const handleDelete=(e)=>{
        const allTodoAfterDelete= allTodo.filter(todos=> todos!==e);
        if(allTodo){
            localStorage.setItem('todo', JSON.stringify(allTodoAfterDelete));
            setAllTodo(allTodoAfterDelete);
        }
    }

/// Render from LocalStorage////
useEffect(()=>{
    const localStorageTodo= JSON.parse(localStorage.getItem('todo'));
    if(localStorageTodo){
        setAllTodo(localStorageTodo)
    }
},[])

    return (
        <div>
            <InputTodo setTodoTitle={setTodoTitle} setTodoDescription={setTodoDescription} handleSubmitButton={handleSubmitButton}/>

            <div className='btn-style flex justify-center mt-10 gap-2'>
                <Button onClick={()=>setIsCompleted('false')} className={`${isCompleted==="false" && "active"}`} type="default">All</Button>
                <Button onClick={()=>setIsCompleted('true')} className={`${isCompleted==="true" && "active"}` }type="default">Completed</Button>
            </div>

        {/* /////////Ant Design Ui Component////// */}
            <div className='mt-10'>
                <Row className='flex justify-center'>
                {new Array(1).fill(0).map((_, index) => {
                const key = `col-${index}`;
                return (
                    <Col className=' '
                    key={key}
                    >
                    {allTodo.map((todos,keyIndex) => {
                                return(
                                    <div key={keyIndex} className='responsive border rounded-lg border-yellow-500 flex justify-between mt-3 mr-2 ml-2 p-6 gap-10'>
                                    <div className='text-gray-300'>
                                    <h1 className='text-xl font-semibold'>{todos.title}</h1>
                                    <p>{todos.description}</p>
                                    </div>
                                    <div className='icon-style text-2xl hover:cursor-pointer flex gap-2'>
                                        <RiDeleteBin5Fill onClick={()=>handleDelete(todos)} className='hover:text-red-600'/>
                                        <IoMdDoneAll className='hover:text-green-600'/>
                                        <FiEdit3 className='hover:text-yellow-600'/>
                                    </div>
                                    </div>
                                )
                            })}
                    </Col>
                );
                })}
                </Row>
            </div>
        </div>

    );
};

export default ShowTodo;