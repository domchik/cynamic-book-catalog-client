import React from 'react';

interface LoadingSpinnerProps {
    loadingText: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loadingText }) => {
    return (
        <div className="flex flex-col justify-center items-center mt-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-gray-700">{loadingText}</p>
        </div>
    );
};

export default LoadingSpinner;