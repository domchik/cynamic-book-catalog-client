import React from 'react';

const NoBooksFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-100 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.167 2.502-2.5V6.162c0-1.334-1.062-2.5-2.502-2.5H5.062c-1.44 0-2.5 1.167-2.5 2.5v12.338c0 1.334 1.062 2.5 2.5 2.5z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-700 mt-4">No Books Found</h2>
            <p className="text-gray-500 mt-2">Try choosing another category</p>
        </div>
    );
};

export default NoBooksFound;
