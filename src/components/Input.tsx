import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

interface InputProps {
    title?: string,
    label: string,
    register: UseFormRegister<any>,
    placeholder?: string,
    className?: string,
    error?: string,
}

const Input: React.FC<InputProps> = ({
    title,
    label,
    register,
    placeholder,
    className,
    error,
}) => {
    let inputType;
    if (label === 'email') inputType = label;
    else if (label.includes('password')) inputType = 'password';
    else inputType = 'text'
    
    return (
        <div className={`flex flex-col${className ? ' ' + className : ''}`}>
            <label className='flex flex-col'>
                {title && <span className='mb-1 text-base'>{title}</span>}
                <input
                    type={inputType}
                    className={`
                        px-3 py-2
                        appearance-none border rounded
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        text-sm leading-tight
                        focus:border-pink-500 focus:outline-0
                        shadow
                        transition-all
                    `}
                    {...register(label)}
                    placeholder={placeholder || title}
                />
            </label>
            {error && (
                <div className='mt-2 text-xs text-red-500 text-italic'>
                    {error}
                </div>
            )}
        </div>
    );
};

export default Input;