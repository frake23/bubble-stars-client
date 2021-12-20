import { useCallback, useEffect, useState } from "react";
import fetcher from "../fetcher";
import { GameProcessResponse } from "../types/responses";

interface UseGameProcessHook {
    (bubbleId: number): {
        data?: GameProcessResponse,
        select: (bubbleVariantId?: number) => void,
        error: any
    }
}

const useGameProcess: UseGameProcessHook = (bubbleId) => {
    const [data, setData] = useState<ReturnType<UseGameProcessHook>['data']>(undefined);
    const [error, setError] = useState<any>(null);

    const select = useCallback<ReturnType<UseGameProcessHook>['select']>((bubbleVariantId) => {
        fetcher(process.env.NEXT_PUBLIC_API_HOST + `/bubbles/${bubbleId}`, {
            method: 'POST',
            body: JSON.stringify({bubble_variant_id: bubbleVariantId})
        })
            .then(json => {
                setData(json as GameProcessResponse);
                setError(null)
            })
            .catch(e => setError(e))
    }, [bubbleId]);

    useEffect(() => {
        if (!bubbleId) return;
        select()
    }, [select, bubbleId]);

    return {
        data, select, error
    }
}

export default useGameProcess;
