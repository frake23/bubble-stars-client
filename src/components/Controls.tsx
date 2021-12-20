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

interface ControlProps {
    label: string,
    register: UseFormRegister<any>
}


type InputProps = ControlWrapperProps & ControlProps & {placeholder?: string}
type SelectProps = ControlWrapperProps & ControlProps & {options: {text: string, value: any}[]}

export function InputControl({placeholder, label, register, ...props}: InputProps) {
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

export function SelectControl({label, register, options, ...props}: SelectProps) {
    return (
        <ControlWrapper {...props}>
            <select
                className={controlClassName(props.error)}
                {...register(label)}
            >
                {options.map(opt => 
                    <option value={opt.value} key={`option-${opt.value}`}>{opt.text}</option>    
                )}
            </select>
        </ControlWrapper>
    )
}
