import React, { createContext } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { UserResponse } from '../types/responses';

interface UserContextValue {
    user?: UserResponse,
    loading: boolean,
    mutate?: KeyedMutator<UserResponse>
}

export const UserContext = createContext<UserContextValue>({user: undefined, loading: true, mutate: undefined});

const UserContextProvider: React.FC = ({children}) => {
    const {data: user, error, mutate} = useSWR<UserResponse>(process.env.NEXT_PUBLIC_API_HOST! + '/user', {
        onErrorRetry: (error) => {
            if (error.status === 401) return;
        },
    });

    return (
        <UserContext.Provider value={{user: error ? undefined : user, loading: !error && user === undefined, mutate}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
