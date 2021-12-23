import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import BubbleVariantSelect from '../../../components/BubbleVariantSelect';
import MainLayout from '../../../components/MainLayout';
import useBubbleId from '../../../hooks/useBubbleId';

const GamePage: NextPage = () => {
    const {bubbleId, router} = useBubbleId();

    const onComplete = useCallback(() => router.push(`/bubbles/${bubbleId}/stats`), [bubbleId, router])

    return (

        <MainLayout className="flex flex-col">
            {
                bubbleId &&
                <div className="container px-4 py-12 flex-grow flex flex-col">
                    <BubbleVariantSelect bubbleId={bubbleId} onComplete={onComplete}/>
                </div>
            }
            
        </MainLayout>
    )
}

export default GamePage
