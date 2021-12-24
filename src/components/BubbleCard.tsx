import React from 'react';
import { BubblesResponse } from '../types/responses';
import Paper from './Paper';
import {UserIcon} from '@heroicons/react/solid'
import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';
import {XIcon, PencilIcon} from '@heroicons/react/solid'

interface BubbleCardProps {
    bubble: BubblesResponse[number],
    managable?: boolean,
    className?: string
}

const BubbleCard: React.FC<BubbleCardProps> = ({bubble, managable=false, className}) => {
    return (
        <Paper className={`flex flex-col hover:shadow-md hover:shadow-blue-300 ${className ? className : ''}`} p={0}>
            
            <div className="flex relative h-52">
                <div className="relative flex-grow">
                    <Image src={bubble.images[0]} alt='image-1' layout="fill" className="rounded-tl-xl"/>
                </div>
                <div className="relative flex-grow">
                    <Image src={bubble.images[1]} alt='image-2' layout="fill" className="rounded-tr-xl"/>
                </div>
                {
                    managable &&
                    <div className='absolute right-0 top-0 m-2 rounded-md z-50 bg-white flex items-center divide-x border'>
                        <Link href={`/bubbles/manage/update/${bubble.id}`} passHref>
                            <a>
                                <PencilIcon className='w-8 h-8 text-blue-500 hover:text-blue-600 p-2'/>
                            </a>
                        </Link>
                        <button className='bg-transparent'>
                            <XIcon className='w-8 h-8 text-red-500 hover:text-red-600 p-2'/>
                        </button>
                    </div>
                }
            </div>
            <div className="flex flex-col text-right p-4 flex-grow">
                <h2 className="text-sm font-bold mb-1 truncate whitespace-nowrap">{bubble.title}</h2>
                <div className="text-xs font-thin mb-1 truncate whitespace-nowrap">{bubble.description}</div>
                <Link href={`/bubbles?user_id=${bubble.user_id}`} passHref>
                    <a className="text-gray-700 hover:text-blue-500 transition-all flex items-center self-end mb-2 text-xs font-mono">
                        <UserIcon className="w-3 h-3 mr-1"/>
                        <span>{bubble.username}</span>
                    </a>
                </Link>
                <div className="flex gap-x-2">
                    <Button 
                        className="flex-grow" 
                        title="Пройти" 
                        color="pink" 
                        href={`/bubbles/${bubble.id}`}
                    />
                    <Button 
                        className="flex-grow"
                        title="Статистика" 
                        type="secondary"
                        href={`/bubbles/${bubble.id}/stats`}
                    />
                </div>
            </div>
        </Paper>
    )
}

export default BubbleCard;
