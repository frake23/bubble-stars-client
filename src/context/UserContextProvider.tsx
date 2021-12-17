import React, { createContext } from 'react';
import useSWR, { KeyedMutator } from 'swr';

interface UserContextValue {
    user?: {
        username: string
    },
    loading: boolean,
    mutate?: KeyedMutator<UserContextValue['user']>
}

export const UserContext = createContext<UserContextValue>({user: undefined, loading: true, mutate: undefined});

const UserContextProvider: React.FC = ({children}) => {
    const {data: user, error, mutate} = useSWR<UserContextValue['user']>(process.env.NEXT_PUBLIC_API_HOST! + '/user', {
        onErrorRetry: (error) => {
            if (error.status === 401) return;
        },
    });

    return (
        <UserContext.Provider value={{user: error ? undefined : user, loading: !error && !user, mutate}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
