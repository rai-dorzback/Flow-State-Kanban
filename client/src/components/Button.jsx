export default function Button({ children, onClick, type}) {
    return (
        <button className="border border-white mx-2 rounded-3xl px-3 py-1 hover:bg-pink-700/75" onClick={onClick} type={type}>
            { children }
        </button>
    )
}