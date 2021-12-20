import Image from 'next/image';
import React, { useEffect } from 'react';
import useGameProcess from '../hooks/useGameProcess';
import { BubbleVariant } from '../types/responses';
import Paper from './Paper';

interface BubbleVariantSelectProps {
    bubbleId: number,
    onComplete: () => void
}

const BubbleVariantSelect: React.FC<BubbleVariantSelectProps> = ({bubbleId, onComplete}) => {
    const {data, select} = useGameProcess(bubbleId);

    useEffect(() => {
        if (data?.completed) onComplete();
    }, [data?.completed, onComplete])

    return (
        data && !data.completed ?
        <div className="flex flex-grow flex-col relative">
            <Paper className="text-2xl text-center mb-8 bg-blue-50 self-center absolute top-8 z-50">
                {data.round}/{data.of}
            </Paper>
            <div className="flex flex-grow md:flex-row flex-col">
                <BubbleVariantOption variant={data.bubble_variants[0]} onClick={() => select(data.bubble_variants[0].id)}/>
                <BubbleVariantOption variant={data.bubble_variants[1]} onClick={() => select(data.bubble_variants[1].id)}/>
            </div>
        </div>:
        null
    )
}

interface BubbleVariantOptionProps {
    onClick: () => void,
    variant: BubbleVariant
}

const BubbleVariantOption: React.FC<BubbleVariantOptionProps> = ({onClick, variant}) => {
    return (
        <div 
            className={`
                flex-grow relative m-1 transition-all
                rounded-xl border border-blue-200 shadow shadow-blue-200 
                hover:shadow-blue-300 hover:shadow-md
            `}
            onClick={onClick}
        >
            <Image src={variant.image} alt={`variant-${variant.id}`} layout="fill" className="rounded-xl"/>
            <h1 className="text-6xl text-white absolute left-1/2 right-1/2 z-10 bottom-10">{variant.name}</h1>
        </div>
    )
}

export default BubbleVariantSelect;
