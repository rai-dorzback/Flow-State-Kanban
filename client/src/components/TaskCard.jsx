import { useDrag } from 'react-dnd';
import { motion } from 'motion/react';
import { ItemTypes } from '../Constants.js';
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from 'react-icons/bs';

const TaskCard = ({ taskId, boardId, columnId, taskName, taskDesc }) => {
    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { taskId, boardId, columnId },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))

    async function handleTaskDelete() {
        const response = await fetch(`http://localhost:8000/api/${boardId}/${columnId}/${taskId}`, {
            method: 'DELETE'
        });

        if(!response.ok) {
            throw new Error('Failed to delete task');
        };
    };

    function handleTaskEdit() {
        // open a modal for editing task
        console.log('open a modal for updating task')
    }

    return (
        <motion.div
            ref={dragPreview}
            style={{
            opacity: isDragging ? 0.7 : 1,
            cursor: "move",
            }}
            animate={{
            scale: isDragging ? 1.02 : 1, // slight zoom on drag
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
        <div 
            className='border rounded-lg border-blue-500 py-2 m-2 bg-slate-900 flex items-center'
            ref={drag}
        >
            <BsThreeDotsVertical className='mr-1 text-gray-400'/>
            <div>
                <div className='flex'>
                    <p className='font-bold'>{ taskName }</p>
                        <MdModeEdit className="cursor-pointer text-xl" onClick={handleTaskEdit}></MdModeEdit>
                        <FaTrashAlt className="cursor-pointer " onClick={handleTaskDelete}></FaTrashAlt>  
                </div>
                <p>{ taskDesc }</p>
            </div>
        </div>
        </motion.div>
    )
};

export default TaskCard