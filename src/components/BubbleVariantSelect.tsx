import Image from 'next/image';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import useGameProcess from '../hooks/useGameProcess';
import { BubbleVariant, SingleBubbleResponse } from '../types/responses';

interface BubbleVariantSelectProps {
    bubbleId: number,
    onComplete: () => void
}

const BubbleVariantSelect: React.FC<BubbleVariantSelectProps> = ({bubbleId, onComplete}) => {
    const {data, select} = useGameProcess(bubbleId);

    useEffect(() => {
        if (data?.completed) onComplete();
    }, [data?.completed, onComplete]);

    const { data: bubble } = useSWR<SingleBubbleResponse>(process.env.NEXT_PUBLIC_API_HOST + `/bubbles/${bubbleId}`)

    return (
        data && !data.completed && bubble ?
        <div className="flex flex-grow flex-col relative">
            <h1 className="text-center mb-6 text-xl md:text-3xl font-bold">{bubble.title}</h1>
            <div className="flex flex-col relative flex-grow">
                <div className={`
                    shadow shadow-pink-400
                    text-2xl font-bold text-center 
                    mb-8 bg-pink-500 self-center 
                    absolute left-0 md:left-auto 
                    md:top-8 z-50 text-white
                    p-4 rounded-xl
                `}>
                    {data.round}/{data.of}
                </div>
                <div className="flex flex-grow md:flex-row flex-col">
                    <BubbleVariantOption variant={data.bubble_variants[0]} onClick={() => select(data.bubble_variants[0].id)}/>
                    <BubbleVariantOption variant={data.bubble_variants[1]} onClick={() => select(data.bubble_variants[1].id)}/>
                </div>
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
                flex flex-col
                md:w-1/2 md:flex-grow-0 flex-grow relative m-1 transition-all
                rounded-xl border-2 border-blue-400 shadow shadow-blue-200 
                hover:shadow-blue-300 hover:shadow-md bg-blue-50
                cursor-pointer
            `}
            onClick={onClick}
        >
            <div className="flex-grow relative">
                <Image src={variant.image} alt={`variant-${variant.id}`} layout="fill" className="rounded-t-xl"/>
            </div>
            <h1 className="text-2xl md:text-4xl text-center p-4 leading-tight font-medium">{variant.name}</h1>
        </div>
    )
}

export default BubbleVariantSelect;
