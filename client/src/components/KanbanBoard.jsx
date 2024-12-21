import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

function EditableTitle({ boardTitle, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <label>
                <input 
                type="text"
                name="boardTitle"
                id="boardTitle"
                placeholder="New Title"
                onChange={onChange}
                value={boardTitle}
                className="bg-black border-b border-white text-lg my-3 text-center w-full"/>
            </label>
        </form>
    )
}

const KanbanBoard = ({ children, board, setBoard }) => {
    const [boardTitle, setBoardTitle] = useState(board.title);
    const [isEditing, setIsEditing] = useState(false);
    
    function handlePencilClick() {
        setIsEditing(true);
    }

    function handleTitleChange(e) {
        setBoardTitle(e.target.value);
    }

    async function updateTitleInDB() {
        try {
            const response = await fetch(`http://localhost:8000/api/${board._id}/title`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: boardTitle }),
            });
    
            if (response.ok) {
                const updatedBoard = await response.json();
                setBoard(updatedBoard); // Update parent component state with new title
                setIsEditing(false);
            } else {
                console.error('Failed to update title');
            }
        } catch (err) {
            console.error('Error updating title:', err);
        }
    }

    function handleTitleSubmit(e) {
        e.preventDefault();
        updateTitleInDB()
    }

    return (
        <DndProvider backend={HTML5Backend}>
        <div className="text-white flex flex-col items-center">
            <div className="flex items-center justify-center">
                {/* if user is editing title, show form else show read-only version */}
                { isEditing ? (
                    <EditableTitle 
                        boardTitle={boardTitle} 
                        onChange={handleTitleChange} 
                        onSubmit={handleTitleSubmit}
                    />
                ) : (
                    <h1 className="border-b border-white text-lg my-3">{ boardTitle }</h1>  
                )}
                <MdModeEdit className="ml-1 cursor-pointer" onClick={handlePencilClick}/>
            </div>
            <div className="w-2/3">
                { children }
            </div>
        </div>
        </DndProvider>
    )
};

export default KanbanBoard