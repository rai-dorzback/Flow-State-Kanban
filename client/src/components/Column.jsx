import { GoPlusCircle } from "react-icons/go";
import { ItemTypes } from '../Constants.js'
import { useDrop } from 'react-dnd'

function AddNewTask({ setOpenModal }) {  
  // function to open modal
  function handleClick() {
      if(setOpenModal) {
          setOpenModal(true);
      }
  };

  return (
      <div className="flex items-center m-2 cursor-pointer" onClick={handleClick}>
          <p>Add New Task</p>
          <GoPlusCircle className="ml-2 text-lg hover:text-pink-500"/>
      </div>
  )
}

export default function Column ({ title, tasks, updateTaskStatus, setOpenModal, children }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => updateTaskStatus(item.taskId, title, item.columnId),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div ref={drop} className="border border-white rounded-xl min-h-32 mb-3 p-2">
        <h1 className="text-center font-bold">{ title }</h1>
         { children }
        {title === "To Do" && (
          <AddNewTask setOpenModal={setOpenModal}/>
        )}
    </div>
  )
}