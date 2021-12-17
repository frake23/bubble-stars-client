import React from 'react';

export interface ControlWrapperProps {
    title?: string;
    className?: string;
    error?: string;
}

const ControlWrapper: React.FC<ControlWrapperProps> = ({
    title,
    className,
    error,
    children
}) => {
    return (
        <div className={`flex flex-col ${className ? className : ''}`}>
            <label className='flex flex-col text-gray-700'>
                {title && <span className='mb-1 text-base'>{title}</span>}
                {children}
            </label>
            {error && (
                <div className='mt-2 text-xs text-red-500 text-italic'>
                    {error}
                </div>
            )}
        </div>
    );
};

export default ControlWrapper