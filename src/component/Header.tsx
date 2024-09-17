import React from 'react';

type Props = {
    saveLayout: () => void;
    resetLayout: () => void;
    toggleEditing: () => void;
    isEditingEnabled: boolean;
};

const Header: React.FC<Props> = ({ saveLayout, resetLayout, toggleEditing, isEditingEnabled }) => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Responsive React Grid Layout with Tailwind CSS</h1>

            <div className="flex justify-between mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={saveLayout}
                >
                    Save Layout
                </button>
                <div className="flex gap-2">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={resetLayout}
                    >
                        Reset
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={toggleEditing}
                    >
                        {isEditingEnabled ? 'Disable Editing' : 'Enable Editing'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;
