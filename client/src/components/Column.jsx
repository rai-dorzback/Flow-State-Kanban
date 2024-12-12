import TaskCard from "./TaskCard";
import { GoPlusCircle } from "react-icons/go";
import { useState, useEffect } from "react";

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

export default function Column ({ title, setOpenModal }) {
  const [ taskList, setTaskList ] = useState([]);
  // *** USE STATE TO MANAGE WHICH TASKS ARE IN WHICH COLUMN AND UPDATE DATABASE
  const [ toDoTasks, setToDoTasks ] = useState([]);
  const [ inProgTasks, setInProgTasks ] = useState([]);
  const [ doneTasks, setDoneTasks ] = useState([]);
  // get list of tasks on mount (useEffect)
  // *** keep working on this, make sure you're fetching the specific tasks for this board to set the task list to.
  useEffect(() => {
    async function fetchTaskList() {
      try {
        let response = await fetch('http://localhost:8000/api/tasks');
        let result = await response.json()
        console.log(result);
        const tasks = [];
        for(const task of result) {
          tasks.push({
              _id: task._id,
              title: task.title,
              desc: task.desc,
              status: task.status
          });
        }
        setTaskList(tasks);
        console.log(tasks)
      } catch(err) {
        console.error(err)
      };
    };
    fetchTaskList();
  }, []);

  return (
    <div className="border border-white rounded-xl min-h-32 mb-3 p-2">
        <h1 className="text-center font-bold">{ title }</h1>
        {/* conditionally render task cards based on their statuses/columns */}
        {(taskList.length > 0)&& (taskList.map(task => {
          if(task.status === "To Do" && title === "To Do") {
            return <TaskCard key={task._id} taskName={task.title} taskDesc={task.desc}></TaskCard>
          } else if (task.status === "In Progress" && title === "In Progress") {
            return <TaskCard key={task._id} taskName={task.title} taskDesc={task.desc}></TaskCard>
          } else if(task.status === "Done" && title === "Done") {
            return <TaskCard key={task._id} taskName={task.title} taskDesc={task.desc}></TaskCard>
          }
          }))}
        {/* <TaskCard taskName='Research' taskDesc='Research kanban boards to figure out features'></TaskCard> */}
        {/* Render "Add New Task" only if the column is "To Do" */}
        {title === "To Do" && (
          <AddNewTask setOpenModal={setOpenModal}/>
        )}
    </div>
  )
}