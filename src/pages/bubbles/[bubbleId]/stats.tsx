import type { NextPage } from 'next';
import React from 'react';
import BubbleStats from '../../../components/BubbleStats';
import MainLayout from '../../../components/MainLayout';
import useBubbleId from '../../../hooks/useBubbleId';

const StatsPage: NextPage = () => {
    const {bubbleId} = useBubbleId();

    return (
        <MainLayout>
            <div className="container px-4 py-12 flex-grow flex flex-col">
                <BubbleStats bubbleId={bubbleId}/>
            </div>
        </MainLayout>
    )
}

export default StatsPage
