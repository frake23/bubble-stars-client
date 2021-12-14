import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function Header() {
    return (
        <div className="shadow-md">
            <div className="container px-4 py-3 flex justify-between">
                <div>
                    <Link href="/" passHref>
                        <a className="flex items-center">
                            <Image src="/bubble.svg" alt="BUBBLE" width={32} height={32}/>
                            <h1 className="font-mono text-xl ml-2 font-bold">Bubble Stars</h1>
                        </a>
                    </Link>
                    <Link href='/'></Link>
                </div>
                <Button title="Войти" href="/login"/>
            </div>
        </div>
    )
}
