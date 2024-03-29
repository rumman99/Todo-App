import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import InputTodo from '../InputTodo/InputTodo';
import CompletedTodo from '../CompletedTab/CompletedTodo';
import EditTodo from '../EditTodo/EditTodo';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowTodo = () => {
    const [isCompleted, setIsCompleted]= useState(false); /// For Toggle Button All or Complete Tab //
    const [completeTab, setCompleteTab]= useState([]);
    const [allTodo, setAllTodo]= useState([]);
    const [todoTitle, setTodoTitle]= useState('');
    const [todoDescription, setTodoDescription]= useState('');
    const [todoPriority, setTodoPriority]= useState('');
    const [toggleEdit, setToggleEdit]= useState(false); //Toggle for Editable Component //

//// Submit Button ////
    const handleSubmitButton=()=>{
        const newTodo={title:todoTitle, description:todoDescription, priority: todoPriority};
        const updatedTodo=[...allTodo, newTodo];
        setAllTodo(updatedTodo);
        localStorage.setItem('todo', JSON.stringify(updatedTodo));

    /// Alert Style ///
        toast.success("Todo Added",{position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,});
    }

//// Delete Button/////
    const handleDelete=(e)=>{
        const allTodoAfterDelete= allTodo.filter(todos=> todos!==e);
        if(allTodo){
            localStorage.setItem('todo', JSON.stringify(allTodoAfterDelete));
            setAllTodo(allTodoAfterDelete);
        }
    }

//// Complete Button ////
const handleComplete=(e)=>{
    const completedTodos= allTodo.find(todos=> todos===e);
    const allCompletedTodos= [...completeTab, completedTodos];
        localStorage.setItem('completedTodo', JSON.stringify(allCompletedTodos))
        setCompleteTab(allCompletedTodos);
        handleDelete(e);

    /// Alert Style ///
        toast.info("Mark as Completed",{position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,});
}

//// Handle Edit Button ////
const handleEdit=(e)=>{
    const getEditableTodo= allTodo.find(todo=>todo===e);
    setToggleEdit(true);
    setAllTodo({title:getEditableTodo.title, description:getEditableTodo.description, priority:getEditableTodo.priority})

//// Remove Editable From Local Storage ////
    const filterAllTodoExpectGettingOne=allTodo.filter(todo=>todo!==e);
    localStorage.setItem('todo', JSON.stringify(filterAllTodoExpectGettingOne));
}

/// Render from LocalStorage////
useEffect(()=>{
    const localStorageAllTodo= JSON.parse(localStorage.getItem('todo'));
    if(localStorageAllTodo){
        setAllTodo(localStorageAllTodo)
    }
    const localStorageCompletedTodo= JSON.parse(localStorage.getItem('completedTodo'));
    if(localStorageCompletedTodo){
        setCompleteTab(localStorageCompletedTodo);
    }
},[])

/// Handle Edited Todo here after Edit ///
const handleLocalStorageAfterEdit=(e)=>{
    const getLocalStorageTodo= JSON.parse(localStorage.getItem('todo'));
    const afterEditTodo=[...getLocalStorageTodo, e]
    setAllTodo(afterEditTodo)
    localStorage.setItem('todo', JSON.stringify(afterEditTodo));
}

    return (
        <>
        {/* Conditional Rendering for Edit Task */}
        { toggleEdit===true ? <EditTodo allTodo={allTodo} handleLocalStorageAfterEdit={handleLocalStorageAfterEdit}></EditTodo> :
        <div>
            <InputTodo setTodoTitle={setTodoTitle} setTodoDescription={setTodoDescription} handleSubmitButton={handleSubmitButton} setTodoPriority={setTodoPriority}/>

            <div className='btn-style flex justify-center mt-10 gap-2'>
                <Button onClick={()=>setIsCompleted(false)} className={`${isCompleted===false && "active"}`} type="default">All</Button>
                <Button onClick={()=>setIsCompleted(true)} className={`${isCompleted===true && "active"}` }type="default">Completed</Button>
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
                    {isCompleted===false && allTodo.map((todos,keyIndex) => {
                                return(
                                    <div key={keyIndex} className='responsive border rounded-lg border-yellow-500 flex justify-between mt-3 mr-2 ml-2 p-6 gap-10'>
                                    <div className='text-gray-300'>
                                    <h5 className='text-xl font-semibold'>{todos.title}</h5>
                                    <p>{todos.description}</p>
                                    <h3 className={`${todos.priority==='High' && 'text-red-600'} ${todos.priority==='Medium' && 'text-yellow-500'} ${todos.priority==='Low' && 'text-purple-500'}`}><span className='text-white'>Priority: </span>{todos.priority}</h3>
                                    </div>
                                    <div className='icon-style text-2xl hover:cursor-pointer flex gap-2'>
                                        <RiDeleteBin5Fill onClick={()=>handleDelete(todos)} className='hover:text-red-600'/>
                                        <IoMdDoneAll onClick={()=>handleComplete(todos)} className='hover:text-green-600'/>
                                        <FiEdit3 onClick={()=>handleEdit(todos)} className='hover:text-yellow-600'/>
                                    </div>
                                    </div>
                                )
                            })}
                    </Col>
                );
                })}
                </Row>
            </div>
        
            {isCompleted===true && completeTab.map((todo, index)=><CompletedTodo key={index} todo={todo} handleDelete={handleDelete} completeTab={completeTab} setCompleteTab={setCompleteTab}/>)}
        </div>
    }
        </>
    );
};

export default ShowTodo;