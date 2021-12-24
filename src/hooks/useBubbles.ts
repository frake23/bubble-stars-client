import useSWR, { KeyedMutator } from "swr";
import { BubblesResponse } from "../types/responses";

interface UseBubblesHook {
    (userId?: number): {
        loading: boolean,
        bubbles?: BubblesResponse,
        mutate: KeyedMutator<BubblesResponse>
    }
}

const useBubbles: UseBubblesHook = (userId) => {
    const url = `/bubbles${userId ? '?user_id=' + userId.toString() : ''}`;
    const {data: bubbles, error, mutate} = useSWR<BubblesResponse>(process.env.NEXT_PUBLIC_API_HOST + url);
    return {
        loading: !bubbles && !error,
        bubbles: !error ? bubbles : undefined,
        mutate
    }
}

export default useBubbles
