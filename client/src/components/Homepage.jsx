import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for redirection

export default function Homepage() {
    const [boardTitle, setBoardTitle] = useState('');
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
// fetch board titles arr
        async function fetchData() {
            try {
                let response = await fetch('http://localhost:8000/api/boards');
                let boardsRes = await response.json()
                const boardArr = [];
                for(const board of boardsRes) {
                    boardArr.push({
                        title: board.title,
                        id: board._id
                    });
                }
                setBoards(boardArr);
            } catch(err) {
                console.error(err)
            }
        };
        fetchData()
    }, []);

    const handleTitleChange = (e) => {
        setBoardTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        
        // fetch from api/boards/create
        try {
            const response = await fetch('http://localhost:8000/api/boards/create', {
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
        <div className="flex">
            <section className="mt-6 flex-1 mx-10">
                <h1 className="text-xl font-bold text-center mb-2">Create A New Kanban Board</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center border-white border-x border-y p-4 mt-6">
                    <label htmlFor="boardTitle" className="text-lg">Board Title:</label>
                    <input
                    type="text"
                    id="boardTitle"
                    value={boardTitle}
                    onChange={handleTitleChange}
                    required
                    placeholder="My Kanban Board"
                    className="text-white bg-black border-x border-y border-white py-1 px-2 my-2 rounded-2xl w-full"
                    />
                    <button type="submit" className="bg-white text-black rounded-2xl py-1 w-full">Submit</button>
                </form>
            </section>
            <section className="mt-6 flex-1 mx-10">
                <h1 className="text-xl font-bold text-center mb-2">Open Existing Kanban Board</h1>
                <ul className="mt-6">{boards.map(board => (
                        <li key={board.id} className="text-xl border-x border-y border-white px-2 py-3 text-center hover:bg-white hover:cursor-pointer hover:text-black"><Link to={`/board/${board.id}`}>{board.title}</Link></li>
                    ))}
                </ul>
            </section>
        </div>
    );
};