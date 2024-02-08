import { Button, Input } from 'antd';

const InputTodo = ({setTodoTitle, setTodoDescription, handleSubmitButton}) => {
    return (
        <>
            <h1 className='text-center mt-10 text-4xl mb-5 text-purple-400 font-semibold'>TODO APP</h1>

            <div className='flex justify-center text-center font-semibold text-green-600'>
            <div>
                <div className='flex gap-2'>
                <div className='input-field'>
                <label>Title</label>
                <Input placeholder="Add Task Title" onBlur={e=>setTodoTitle(e.target.value)} maxLength="50"/>
                </div>
                <div className='input-field'>
                <label>Description</label>
                <Input placeholder="Add Description" onBlur={e=>setTodoDescription(e.target.value)} maxLength="50"/>
                </div>
                <div className='input-field pt-6'>
                <Button onClick={()=>handleSubmitButton()} danger>Submit</Button>
                </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default InputTodo;