import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KanbanBoard from "./KanbanBoard";
import Column from "./Column";
import NewTaskForm from "./NewTaskForm";
import TaskCard from "./TaskCard";

export default function BoardView() {
    const [ board, setBoard ] = useState();
    const [openModal, setOpenModal] = useState(false);
    const { boardId } = useParams();

    // fetch board on page mount
    useEffect(() => {
        async function fetchBoard() {
            try {
                let response = await fetch(`http://localhost:8000/api/${boardId}`);
                let result = await response.json();
                setBoard(result);
            } catch(err) {
                console.error(`${err}: failed to load board data`);
            }
        };
        fetchBoard();
    }, [board]);

    if(!board) {
        return <div>Loading...</div>
    }

    async function updateTaskStatus(taskId, newStatus, columnId) {
        try {
          // make fetch request
          const response = await fetch(`http://localhost:8000/api/${boardId}/${taskId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              status: newStatus
            })
          });
      
          if(!response.ok) {
            throw new Error('Failed to update task status');
          };
      
          const updatedBoard = {...board};
          const column = updatedBoard.columns.find(col => col._id === columnId);
          if(column) {
            const task = column.tasks.find(task => task._id === taskId);
            if (task) {
              task.status = newStatus;
            }
          };

          setBoard(updatedBoard);
          console.log(`Task successfully moved.`)
        } catch(err) {
          console.error("Error updating task:", err);
        }
      };

    return (
        <>
            <div className="text-white">
                <KanbanBoard board={board} setBoard={setBoard}>
                    {board.columns.map(column => (
                        <Column 
                            setOpenModal={setOpenModal}
                            key={column._id}
                            title={column.title}
                            tasks={column.tasks}
                            updateTaskStatus={updateTaskStatus}
                            >
                                {column.tasks.map(task => (
                                    <TaskCard 
                                    key={task._id} 
                                    taskId={task._id}
                                    boardId={board._id} 
                                    columnId={column._id}
                                    taskName={task.title} 
                                    taskDesc={task.desc}></TaskCard>
                                ))}
                            </Column>
                    ))}
                </KanbanBoard>
                {openModal && (
                <NewTaskForm setOpenModal={setOpenModal} boardId={boardId}></NewTaskForm>
                )}
            </div>
        </>
    )
}