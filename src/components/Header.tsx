import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import useUser from '../hooks/useUser';
import {UserIcon} from '@heroicons/react/outline';

export default function Header() {
    const {user, loading} = useUser();

    return (
        <div className="shadow-md bg-pink-50">
            <div className="container px-4 py-3 flex justify-between">
                <div className="flex items-center">
                    <Link href="/" passHref>
                        <a className="flex items-center mr-8">
                            <Image src="/bubble.svg" alt="BUBBLE" width={32} height={32}/>
                            <h1 className="font-mono text-xl ml-2 font-bold">Bubble Stars</h1>
                        </a>
                    </Link>
                    <Link href='/bubble/create' passHref>
                        <a className="text-base text-pink-500">Создать bubble</a>
                    </Link>
                </div>
                {
                    !loading &&
                    (
                        user ?
                        <Link href='/profile' passHref>
                            <a className="flex font-mono text-base font-bold text-pink-500 items-center">
                                {user.username}
                                <UserIcon className="w-6 h-6 ml-1"/>
                            </a>
                        </Link>
                            :
                        <Button title="Войти" href="/login"/>
                    )
                }
                
            </div>
        </div>
    )
}