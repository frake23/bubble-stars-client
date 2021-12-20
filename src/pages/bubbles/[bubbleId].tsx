import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import BubbleVariantSelect from '../../components/BubbleVariantSelect';
import MainLayout from '../../components/MainLayout';

const GamePage: NextPage = () => {
    const router = useRouter()
    const { bubbleId } = router.query as {bubbleId: string};

    useEffect(() => {
        if (bubbleId && parseInt(bubbleId) === NaN) router.push('/404')
    }, [bubbleId, router]);

    const onComplete = useCallback(() => router.push(`/bubbles/${bubbleId}/stats`), [bubbleId, router])

    return (

        <MainLayout className="flex flex-col">
            {
                bubbleId &&
                <div className="container px-4 py-16 flex-grow flex flex-col">
                    <BubbleVariantSelect bubbleId={parseInt(bubbleId)} onComplete={onComplete}/>
                </div>
            }
            
        </MainLayout>
    )
}

export default GamePage
