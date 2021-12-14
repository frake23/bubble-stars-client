import React from 'react';

interface PaperProps {
    className?: string;
}

const Paper: React.FC<PaperProps> = ({ className, children }) => {
    return (
        <div
            className={`rounded-xl shadow-md border border-gray-300 p-4${className ? ' ' + className : ''}`}
        >
            {children}
        </div>
    );
};

export default Paper;