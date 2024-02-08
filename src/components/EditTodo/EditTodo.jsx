import {Button, Input} from "antd";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";


const EditTodo = ({allTodo, handleLocalStorageAfterEdit}) => {
    const [editableForm, setEditableForm]= useState({...allTodo})

    const handleonChange = (e) => {
        const { name, value } = e.target;
        setEditableForm({ ...editableForm, [name]: value });
    };

    const handleEditedValueSubmit=(e)=>{
        handleLocalStorageAfterEdit(e);
        window.location.reload(false);
    }

    return (    
        <div>
            <h1 className="text-4xl text-center mt-10 text-green-600 font-bold">EDIT</h1>
            <div className='flex justify-center mt-5 gap-2'>
                <div>
                <label>Title</label>
                <Input name="title" value={editableForm.title} onChange={handleonChange}/>
                </div>
                <div>
                <label>Description</label>
                <Input name="description" value={editableForm.description} onChange={handleonChange}/>
                </div>
                <form onChange={handleonChange} value={editableForm.priority} className='text-left'>
                    <p className='text-center text-sky-400'>Priority</p>
                    <input onChange={handleonChange} type="radio" name='priority' value={editableForm.priority}/>
                    <label> High</label><br/>
                    
                    <input onChange={handleonChange} type="radio" name='priority' value={editableForm.priority}/>
                    <label> Medium</label><br/>
                    
                    <input onChange={handleonChange} type="radio" name='priority' value={editableForm.priority}/>
                    <label> Low</label><br/>
                </form>
                <Button onClick={()=>handleEditedValueSubmit({title:editableForm.title, description:editableForm.description, priority:editableForm.priority})} danger className="flex gap-2 mt-8 ml-5"><FiEdit3/>Update
                </Button>
            </div>
        </div>
    );
};

export default EditTodo;