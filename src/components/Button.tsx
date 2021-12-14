import Link from 'next/link';
import React from 'react';


interface ButtonProps {
    title: string,
    type?: 'primary' | 'secondary',
    onClick?: (() => void) | 'submit',
    className?: string,
    color?: string,
    href?: string
}

const Button: React.FC<ButtonProps> = ({
    title,
    type='primary',
    onClick = 'submit',
    className,
    color = 'pink',
    href
}) => {
    const _container: React.FC = ({children}) => 
        href 
            ? <Link href={href} passHref>{children}</Link>
            : <>{children}</>
    return (
        <_container>
            <button
                className={`
                    transition-all
                    flex items-center justify-center 
                    text-sm py-2 px-4 font-medium
                    ${
                        type === 'primary'
                            ? `bg-${color}-500 hover:bg-${color}-600 text-white`
                            : `bg-white border-2 border-${color}-500 hover:bg-gray-50 text-${color}-500`
                    }
                    rounded
                    ${className || ''}
                `}
                type={onClick === 'submit' ? 'submit' : 'button'}
                onClick={onClick !== 'submit' ? onClick : undefined}
            >
                {title}
            </button>        
        </_container>
    );
};

export default Button;