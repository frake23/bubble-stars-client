import React from 'react';
import { BubblesResponse } from '../types/responses';
import Paper from './Paper';
import {UserIcon} from '@heroicons/react/solid'
import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';

interface BubbleCardProps {
    bubble: BubblesResponse[number],
    managable?: boolean,
    className?: string
}

const BubbleCard: React.FC<BubbleCardProps> = ({bubble, managable=false, className}) => {
    return (
        <Paper className={`flex flex-col hover:shadow-md hover:shadow-pink-300 ${className ? className : ''}`} p={0}>
            <div className="flex relative h-52">
                <div className="relative flex-grow">
                    <Image src={bubble.images[0]} alt='image-1' layout="fill" className="rounded-tl-xl"/>
                </div>
                <div className="relative flex-grow">
                    <Image src={bubble.images[1]} alt='image-1' layout="fill" className="rounded-tr-xl"/>
                </div>
            </div>
            <div className="flex flex-col text-right p-4 flex-grow">
                <h2 className="text-sm font-bold mb-1 truncate whitespace-nowrap">{bubble.title}</h2>
                <div className="text-xs font-thin mb-1 truncate whitespace-nowrap">{bubble.description}</div>
                <Link href={`/bubbles?user_id=${bubble.user_id}`} passHref>
                    <a className="text-gray-700 hover:text-pink-500 transition-all flex items-center self-end mb-2 text-xs font-mono">
                        <UserIcon className="w-3 h-3 mr-1"/>
                        <span>{bubble.username}</span>
                    </a>
                </Link>
                <div className="flex gap-x-2">
                    <Button 
                        className="flex-grow" 
                        title="Пройти" 
                        color="blue" 
                        href={`/bubbles/${bubble.id}`}
                    />
                    <Button 
                        className="flex-grow"
                        title="Статистика" 
                        color="yellow" 
                        type="secondary"
                        href={`/bubbles/${bubble.id}/stats`}
                    />
                </div>
            </div>
        </Paper>
    )
}

export default BubbleCard;
