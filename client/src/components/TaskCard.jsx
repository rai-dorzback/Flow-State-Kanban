import { BsThreeDotsVertical } from "react-icons/bs";

const TaskCard = ({ taskName, taskDesc }) => {
    return (
        <div className="border rounded-lg border-blue-500 py-2 m-2 bg-slate-900 flex items-center">
            <BsThreeDotsVertical className="mr-1 cursor-pointer text-gray-400"/>
            <div>
                <p className="font-bold">{ taskName }</p>
                <p>{ taskDesc }</p>
            </div>
        </div>
    )
};

export default TaskCard