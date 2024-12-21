import { useState } from "react";
import Button from "./Button.jsx";

const NewTaskForm = ({ setOpenModal, boardId }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    // e.preventDefault();
    setLoading(true);
    addTaskToDB();
  };

  async function addTaskToDB() {
    try {
      const response = await fetch(`http://localhost:8000/api/${boardId}/createTask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: taskTitle, 
          desc: taskDesc
        })
      });
      if(!response.ok) {
        throw new Error('Failed to add new task')
      } else {
        console.log(response)
        setLoading(false);
      }
    } catch(err) {
      console.error(`Error creating new task: ${err}`);
    };
  };

  function handleCloseModal() {
    setOpenModal(false);
  };

  return (
    <div className="fixed top-0 bg-black bg-opacity-90 w-full h-full flex items-center justify-center">
      <section className="border border-pink-500 rounded-xl p-2 flex flex-col items-center bg-pink-900/50 w-3/4">
        <h1 className="font-bold my-1">Add New Task</h1>
        <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3 flex flex-col items-center">
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  className="bg-black border border-white rounded-lg py-1 px-3" 
                  onChange={e => setTaskTitle(e.target.value)}
                  required
                  placeholder="I.e., Wireframe website layout"/>
            </div>
            {/* Description */}
            <div className="mb-3 flex flex-col items-center">
                <label htmlFor="desc" className="mx-3">Description</label>
                <textarea 
                  rows="5" 
                  id="desc" 
                  name="desc" 
                  className="bg-black border border-white rounded-lg py-1 px-3" 
                  onChange={e => setTaskDesc(e.target.value)}
                  placeholder="I.e., Design 1 mobile and 1 desktop layout"/>
            </div>
            <div className="flex justify-center">
              <Button type="submit" >Add</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </div>
        </form>
      </section>
    </div>
  )
};

export default NewTaskForm;