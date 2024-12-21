import { BsThreeDotsVertical } from "react-icons/bs";
import { ItemTypes } from "../Constants.js";
import { useDrag } from 'react-dnd'

const TaskCard = ({ taskId, boardId, columnId, taskName, taskDesc }) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { taskId, boardId, columnId },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))

    return (
        <div 
            className="border rounded-lg border-blue-500 py-2 m-2 bg-slate-900 flex items-center"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <BsThreeDotsVertical className="mr-1 text-gray-400"/>
            <div>
                <p className="font-bold">{ taskName }</p>
                <p>{ taskDesc }</p>
            </div>
        </div>
    )
};

export default TaskCard