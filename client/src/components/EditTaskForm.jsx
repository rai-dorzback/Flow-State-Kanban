import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Button from "./Button.jsx";

const EditTaskForm = () => {
    const { boardId, columnId, taskId, taskName, taskDesc} = useParams();
    const [loading, setLoading] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState(taskName);
    const [newTaskDesc, setNewTaskDesc] = useState(taskDesc);
    const navigate = useNavigate();

  function handleSubmit() {
    setLoading(true);
    editTaskInDB();
    navigate(`/board/${boardId}`); 
    setLoading(false);
  };

  async function editTaskInDB() {
      console.log(`New Title: ${newTaskTitle}\nNew Desc: ${newTaskDesc}`)
      try {
        const response = await fetch(`http://localhost:8000/api/${boardId}/${columnId}/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              title: newTaskTitle,
              desc: newTaskDesc
            })
          });
        if(!response.ok) {
            throw new Error('Failed to update task');
        } else {
            console.log(response);
        };
      } catch(err) {
        console.error(err);
      };
  };

  function handleCloseModal() {
    navigate(`/board/${boardId}`); 
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <section className="border border-green-500 rounded-xl p-2 flex flex-col items-center bg-green-900/50 w-3/4">
        <h1 className="font-bold my-1">Edit Task</h1>
        <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3 flex flex-col items-center">
                <label htmlFor="title2">Title</label>
                <input 
                  type="text" 
                  id="title2" 
                  name="title" 
                  className="bg-black border border-white rounded-lg py-1 px-3" 
                  onChange={e => setNewTaskTitle(e.target.value)}
                  defaultValue={taskName}
                  required/>
            </div>
            {/* Description */}
            <div className="mb-3 flex flex-col items-center">
                <label htmlFor="desc2" className="mx-3">Description</label>
                <textarea 
                  rows="5" 
                  id="desc2" 
                  name="desc" 
                  className="bg-black border border-white rounded-lg py-1 px-3" 
                  onChange={e => setNewTaskDesc(e.target.value)}
                  defaultValue={taskDesc}
                  />
            </div>
            <div className="flex justify-center">
              <Button type="submit" >Submit</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </div>
        </form>
      </section>
    </div>
  )
};

export default EditTaskForm;