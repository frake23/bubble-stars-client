import React, { createContext, Provider } from 'react';
import useSWR from 'swr';

interface UserContextValue {
    user?: {
        email: string,
        username: string
    },
    loading: boolean
}

export const UserContext = createContext<UserContextValue>({user: undefined, loading: true});

const UserContextProvider: React.FC = ({children}) => {
    const {data: user, isValidating} = useSWR<UserContextValue['user']>(process.env.NEXT_PUBLIC_API_HOST! + '/user');
    return (
        <UserContext.Provider value={{user, loading: isValidating}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
