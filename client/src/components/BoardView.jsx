import KanbanBoard from "./KanbanBoard";
import Column from "./Column";
import NewTaskForm from "./NewTaskForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BoardView() {
    const { boardId } = useParams();
    const [ board, setBoard ] = useState();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        async function fetchBoard() {
            try {
                let response = await fetch(`http://localhost:8000/api/board/${boardId}`);
                let result = await response.json();
                setBoard(result);
            } catch(err) {
                console.error(`${err}: failed to load board data`);
            }
        };
        fetchBoard();
    }, [boardId]);

    if(!board) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="text-white">
                <KanbanBoard board={board} setBoard={setBoard}>
                    {board.columns.map(column => (
                        <Column 
                            setOpenModal={setOpenModal}
                            key={column._id}
                            title={column.title}></Column>
                    ))}
                </KanbanBoard>
                {openModal && (
                <NewTaskForm setOpenModal={setOpenModal}></NewTaskForm>
                )}
            </div>
        </>
    )
}