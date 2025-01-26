import { useState } from "react";
import Button from "./Button.jsx";

const EditTaskForm = ({ setOpenEditModal, boardId, taskId, taskName, taskDesc }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);
    editTaskInDB();
  };

//   async function editTaskInDB() {
//     try {
//       // ***make fetch request to edit task
//       if(!response.ok) {
//         throw new Error('Failed to add new task')
//       } else {
//         console.log(response)
//         setLoading(false);
//       }
//     } catch(err) {
//       console.error(`Error creating new task: ${err}`);
//     };
//   };

  function handleCloseModal() {
    setOpenEditModal(false);
  };

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-85 w-full h-full flex items-center justify-center">
      <section className="border border-green-500 rounded-xl p-2 flex flex-col items-center bg-green-900/50 w-3/4">
        <h1 className="font-bold my-1">Edit Task</h1>
        <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3 flex flex-col items-center">
                <label htmlFor="title">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  className="bg-black border border-white rounded-lg py-1 px-3" 
                  onChange={e => setNewTaskTitle(e.target.value)}
                  value={taskName}
                  required/>
            </div>
            {/* Description */}
            <div className="mb-3 flex flex-col items-center">
                <label htmlFor="desc" className="mx-3">Description</label>
                <textarea 
                  rows="5" 
                  id="desc" 
                  name="desc" 
                  className="bg-black border border-white rounded-lg py-1 px-3" 
                  onChange={e => setNewTaskDesc(e.target.value)}
                  value={taskDesc}
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