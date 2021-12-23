import Link from 'next/link';
import React from 'react';


interface ButtonProps {
    title: string,
    type?: 'primary' | 'secondary',
    onClick?: (() => void) | 'submit',
    className?: string,
    color?: 'pink' | 'red' | 'blue' | 'green' | 'yellow',
    href?: string
}

const Button: React.FC<ButtonProps> = ({
    title,
    type='primary',
    onClick = 'submit',
    className,
    color = 'blue',
    href
}) => {
    const { primaryColor, secondaryColor } = pickColor(color);

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
                            ? `text-white ${primaryColor}`
                            : `bg-white border-2 hover:bg-blue-50 ${secondaryColor}`
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

function pickColor(color: ButtonProps['color']) {
    let primaryColor;
    let secondaryColor;
    if (color === 'pink') {
        primaryColor = 'bg-pink-500 hover:bg-pink-600';
        secondaryColor = 'border-pink-500 text-pink-500';
    } else if (color === 'red') {
        primaryColor = 'bg-red-500 hover:bg-red-600';
        secondaryColor = 'border-red-500 text-red-500';
    } else if (color === 'blue') {
        primaryColor = 'bg-blue-500 hover:bg-blue-600';
        secondaryColor = 'border-blue-500 text-blue-500';
    } else if (color === 'green') {
        primaryColor = 'bg-green-600 hover:bg-green-700';
        secondaryColor = 'border-green-600 text-green-600';
    } else {
        primaryColor = 'bg-yellow-300 hover:bg-yellow-400';
        secondaryColor = 'border-yellow-400 text-yellow-400';
    }
    return {primaryColor, secondaryColor}
}

export default Button;