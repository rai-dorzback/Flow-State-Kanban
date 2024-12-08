import { useState } from "react";
import { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";

function EditableTitle({ boardTitle, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <label>
                <input 
                type="text" 
                name="boardTitle" 
                placeholder="My Kanban Board" 
                id="boardTitle"
                value={boardTitle}
                onChange={onChange}
                className="bg-black border-b border-white text-lg my-3 text-center w-full"/>
            </label>
        </form>
    )
}

const KanbanBoard = ({ children }) => {
    const [boardTitle, setBoardTitle] = useState(() => localStorage.getItem('boardTitle') || 'My Kanban Board');
    const [isEditing, setIsEditing] = useState(false);

    // useEffect to store new title in local storage. re-render if boardTitle changes based on input
    useEffect(() => {
        localStorage.setItem('boardTitle', boardTitle)
    }, [boardTitle]);
    
    function handlePencilClick() {
        setIsEditing(true);
    }

    function handleTitleSubmit(e) {
        e.preventDefault();
        setIsEditing(false);
    }

    function handleTitleChange(e) {
        setBoardTitle(e.target.value);
    }

    return (
        <div className="text-white flex flex-col items-center">
            <div className="flex items-center justify-center">
                {/* if user is editing title, show form else show read-only version */}
                { isEditing ? (
                    <EditableTitle boardTitle={boardTitle} onChange={handleTitleChange} onSubmit={handleTitleSubmit}/>
                ) : (
                    <h1 className="border-b border-white text-lg my-3">{ boardTitle }</h1>  
                )}
                <MdModeEdit className="ml-1 cursor-pointer" onClick={handlePencilClick}/>
            </div>
            <div className="w-2/3">
                { children }
            </div>
        </div>
    )
};

export default KanbanBoard