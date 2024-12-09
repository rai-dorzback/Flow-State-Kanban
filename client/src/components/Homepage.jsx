import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function Homepage() {
    const [boardTitle, setBoardTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setBoardTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // fetch from api/boards/create
        try {
            const response = await fetch('https://localhost:8000/api/boards/create', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({ title: boardTitle })
            });

            if (!response.ok) {
                throw new Error('Failed to create the board');
            };
        
            const result = await response.json();
            console.log('New board created:', result);
            setLoading(false);
    
            // after board created, redirect to the board view
            navigate(`/board/${result._id}`); 
    
            // reset the input field after successful board creation
            setBoardTitle('');

        } catch(err) {
            setError(err.message);
        }
    };

    return (
        <>
            <section>
                <h1>Create A New Kanban Board</h1>
                <form onSubmit={handleSubmit}>
                    <label>Board Title:
                        <input
                        type="text"
                        id="boardTitle"
                        value={boardTitle}
                        onChange={handleTitleChange}
                        required
                        placeholder="My Kanban Board"
                        className="text-black"
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </section>
            <section>
                <h1>Open Existing Kanban Board</h1>
                <p>Title</p>
            </section>
        </>
    );
};