import React from 'react';
const ServerError: React.FC = () => {

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">Server error occurred.   Please try again.</span>
        </div>
    );
};

export default ServerError;
