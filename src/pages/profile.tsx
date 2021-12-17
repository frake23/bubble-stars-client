import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../components/Button';
import MainLayout from '../components/MainLayout';
import fetcher from '../fetcher';
import useAuthRedirect from '../hooks/useAuthRedirect';
import useUser from '../hooks/useUser';

const ProfilePage: NextPage = () => {
    const router = useRouter();
    const {mutate} = useUser();
    useAuthRedirect();

    return (
        <MainLayout>
            <Button title="Выйти" color="red" onClick={async () => {
                await fetcher(process.env.NEXT_PUBLIC_API_HOST + '/auth/logout', {method: 'DELETE'})
                mutate!()
            }}/>
        </MainLayout>
    )
}

export default ProfilePage
