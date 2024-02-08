import { Col, Row } from "antd";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Bounce, toast } from "react-toastify";

const CompletedTodo = ({todo, completeTab, setCompleteTab}) => {

//// Handle Delete Button/////
const handleDelete=(e)=>{
    const allTodoAfterDelete= completeTab.filter(todo=> todo!==e);
    if(completeTab){
        localStorage.setItem('completedTodo', JSON.stringify(allTodoAfterDelete));
        setCompleteTab(allTodoAfterDelete);

        /// Alert Style ///
        toast.success("Deleted",{position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,});
    }
}

    return (
        <div>
            <div className=''>
                <Row className='flex justify-center'>
                {new Array(1).fill(0).map((_, index) => {
                const key = `col-${index}`;
                return (
                    <Col className=' '
                    key={key}
                    >
                        <div className='responsive border rounded-lg border-yellow-500 flex justify-between mt-3 mr-2 ml-2 p-6 gap-10'>
                            <div className='text-gray-300'>
                            <h5 className='text-xl font-semibold'>{todo.title}</h5>
                            <p>{todo.description}</p>
                            <h3 className={`${todo.priority==='High' && 'text-red-600'} ${todo.priority==='Medium' && 'text-yellow-500'} ${todo.priority==='Low' && 'text-purple-500'}`}><span className='text-white'>Priority: </span>{todo.priority}</h3>
                            </div>
                            <div className='icon-style text-2xl hover:cursor-pointer flex gap-2'>
                                <RiDeleteBin5Fill onClick={()=>handleDelete(todo)} className='hover:text-red-600'/>
                            </div>
                        </div>
                    </Col>
                );
                })}
                </Row>
            </div>
        </div>
    );
};

export default CompletedTodo;