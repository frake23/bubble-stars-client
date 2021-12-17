import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import ControlWrapper, {ControlWrapperProps} from "./ControlWrapper";

const controlClassName = (error?: string) => `
    px-3 py-2
    appearance-none border rounded
    ${error ? 'border-red-500' : 'border-gray-300'}
    text-sm leading-tight
    focus:border-pink-500 focus:outline-0
    shadow
    transition-all
`

interface ControllerProps {
    label: string;
    register: UseFormRegister<any>;
}

type InputProps = ControlWrapperProps & ControllerProps & {placeholder?: string}

export function Input({placeholder, label, register, ...props}: InputProps) {
    let inputType;
    if (label === 'email') inputType = label;
    else if (label.includes('password')) inputType = 'password';
    else inputType = 'text'

    return (
        <ControlWrapper {...props}>
            <input
                type={inputType}
                className={controlClassName(props.error)}
                {...register(label)}
                placeholder={placeholder || props.title}
            />
        </ControlWrapper>
    )
}

export function TextArea({placeholder, label, register, ...props}: InputProps) {
    return (
        <ControlWrapper {...props}>
            <textarea
                className={controlClassName(props.error) + ' resize-none'}
                {...register(label)}
                placeholder={placeholder || props.title}
            />
        </ControlWrapper>
    )
}
