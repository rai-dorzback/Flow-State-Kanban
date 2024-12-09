import KanbanBoard from "./KanbanBoard";
import Column from "./Column";
import NewTaskForm from "./NewTaskForm";
import { useState } from "react";

export default function BoardView() {
    // openModal state
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
        <div className="text-white">
            <KanbanBoard setOpenModal={setOpenModal}>
                <Column title="To Do" setOpenModal={setOpenModal}/>
                <Column title="In Progress"/>
                <Column title="Done"/>
            </KanbanBoard>
            {openModal && (
            <NewTaskForm setOpenModal={setOpenModal}></NewTaskForm>
            )}
        </div>
        {openModal && <NewTaskForm setOpenModal={setOpenModal} />}
        </>
    )
}