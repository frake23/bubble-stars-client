import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useBubbleId() {
    const router = useRouter()
    const { bubbleId } = router.query as {bubbleId: string};

    useEffect(() => {
        if (bubbleId && parseInt(bubbleId) === NaN) router.push('/404')
    }, [bubbleId, router]);

    return {bubbleId: parseInt(bubbleId), router}
}