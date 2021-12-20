import React from 'react';

interface PaperProps {
    className?: string,
    p?: 0 | 4
}

const Paper: React.FC<PaperProps> = ({ className, children, p = 4 }) => {
    const pClass = p === 4 ? 'p-4' : 'p-0'
    return (
        <div
            className={`transition-all rounded-xl shadow shadow-blue-200 border border-blue-200 ${pClass} ${className ? className : ''}`}
        >
            {children}
        </div>
    );
};

export default Paper;