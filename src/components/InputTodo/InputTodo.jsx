import { Button, Input } from 'antd';

const InputTodo = ({setTodoTitle, setTodoDescription, handleSubmitButton, setTodoPriority}) => {
    return (
        <>
            <h1 className='text-center mt-10 text-4xl mb-5 text-red-500 font-semibold'>TODO APP</h1>

            <div className='flex justify-center text-center font-semibold text-white'>
            <div>
                <div className='flex gap-2'>
                <div>
                <label>Title</label>
                <Input placeholder="Add Task Title" onBlur={e=>setTodoTitle(e.target.value)} maxLength="50" required/>
                </div>
                <div>
                <label>Description</label>
                <Input placeholder="Add Description" onBlur={e=>setTodoDescription(e.target.value)} maxLength="50" required/>
                </div>
                <form onBlur={e=>setTodoPriority(e.target.value)} className='text-left'>
                    <p className='text-center text-sky-400'>Priority</p>
                    <input type="radio" name='priority' value="High" required/>
                    <label> High</label><br/>
                    
                    <input type="radio" name='priority' value="Medium" required/>
                    <label> Medium</label><br/>
                    
                    <input type="radio" name='priority' value="Low" required/>
                    <label> Low</label><br/>
                </form>
                <div className='pt-6'>
                <Button onClick={()=>handleSubmitButton()} danger>Submit</Button>
                </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default InputTodo;