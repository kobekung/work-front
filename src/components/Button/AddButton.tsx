import { RiAddLine } from 'react-icons/ri'; // Import the React Icons plus icon

const AddButton = ({ onClick }: { onClick: () => void; }) => {
    return (
        <button
            onClick={onClick}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
        >
            <RiAddLine size={20} /> {/* Use the plus icon */}
        </button>
    );
};

export default AddButton;
