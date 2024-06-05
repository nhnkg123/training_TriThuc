export default function Button({ id, className, onClick, children }) {
    return (
        <button
            id={id}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
}