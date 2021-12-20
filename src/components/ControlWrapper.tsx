import React from 'react';

export interface ControlWrapperProps {
    title?: string,
    className?: string,
    error?: string,
    titleClassName?: string
}

const ControlWrapper: React.FC<ControlWrapperProps> = ({
    title,
    className,
    error,
    children,
    titleClassName
}) => {
    return (
        <div className={`flex flex-col ${className ? className : ''}`}>
            <label className={`flex flex-col ${error ? 'text-red-500' : 'text-gray-700'}`}>
                {title && <span className={`mb-1 text-base ${titleClassName ? titleClassName : ''}`}>{title}{error && <span className="italic text-xs"> - {error}</span>}</span>}
                {children}
            </label>
        </div>
    );
};

export default ControlWrapper