import { BsThreeDotsVertical } from 'react-icons/bs';
import { ItemTypes } from '../Constants.js';
import { useDrag } from 'react-dnd';
import { motion } from 'motion/react';

const TaskCard = ({ taskId, boardId, columnId, taskName, taskDesc }) => {
    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { taskId, boardId, columnId },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))

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
                <p className='font-bold'>{ taskName }</p>
                <p>{ taskDesc }</p>
            </div>
        </div>
        </motion.div>
    )
};

export default TaskCard