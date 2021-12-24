import React from 'react';
import useBubbles from '../hooks/useBubbles';
import BubbleCard from './BubbleCard';

interface BubblesFeedProps {
    userId?: number,
    className?: string,
    managable?: boolean
}

const BubblesFeed: React.FC<BubblesFeedProps> = ({userId, managable=false, className}) => {
    const {bubbles, loading, mutate} = useBubbles(userId);
    
    return (
        (
            !loading ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {bubbles?.map((bubble) =>
                    <BubbleCard 
                        className="col-span-1"
                        bubble={bubble} 
                        key={`bubble-${bubble.id}`}
                        managable={managable}
                        mutate={mutate}
                    />
                )}
            </div>
            : null
        )
    )
}

export default BubblesFeed;
