import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';
import { StatsResponse } from '../types/responses';

interface BubbleStatsProps {
    bubbleId: number
}

const BubbleStats: React.FC<BubbleStatsProps> = ({bubbleId}) => {
    const {data: stats} = useSWR<StatsResponse>(process.env.NEXT_PUBLIC_API_HOST + `/bubbles/${bubbleId}/stats`);
    const {t} = useTranslation('stats')
    return (
        stats && stats.bubble_variants ?
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4 text-center">{t('header')}</h1>
            <div className="flex flex-col mb-4">
                <h1 className="text-2xl font-bold">{stats.title}, <span className='font-normal'>{t('played')} {stats.games_count} {t('times')}</span></h1>
                <span className="font-thin">{stats.description}</span>
            </div>
            <div className='grid grid-cols-12 divide-x text-lg font-semibold text-center divide-y'>
            <div className='col-span-1 p-4'>№</div>
            <div className='col-span-3 p-4'>{t('name')}</div>
            <div className='col-span-4 p-4'>{t('image')}</div>
            <div className='col-span-2 p-4'>{t('count')}</div>
            <div className='col-span-2 p-4'>{t('precent')}</div>
            {stats.bubble_variants.map((stat, index) => 
                <BubbleStatsItem stat={stat} key={`stat-${stat.id}`} index={index + 1}/>
            )}
            </div>
        </div>
        
        : null
    )
}

const BubbleStatsItem =({stat, index}: {stat: StatsResponse['bubble_variants'][number], index: number}) => {
    let winrateColor;
    if (stat.winrate > 50) winrateColor = 'text-green-600'
    else if (stat.winrate > 20) winrateColor = 'text-yellow-600'
    else winrateColor = 'text-red-600'
    return (
        <>
            <div className='col-span-1 p-4 text-lg font-medium'>{index}</div>
            <div className='col-span-3 p-4 text-xl font-bold'>{stat.name}</div>
            <div className='col-span-4 relative m-4'>
                <Image src={stat.image} layout="responsive" alt='image' width="100%" height="100"/>
            </div>
            <div className='col-span-2 p-4'>{stat.won_times}</div>
            <div className={`col-span-2 p-4 ${winrateColor}`}>{stat.winrate}</div>
        </>
    )
}

export default BubbleStats;
